const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const reviews = await Review.findByPk(req.params.reviewId);
    if (!reviews) {
        return res
            .status(404)
            .json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
    }
    if (reviews.userId !== req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden. Sorry,this is not your review.",
            "statusCode": 403
        })
    }
    const images = await ReviewImage.findAll({
        where: {
            reviewId: reviews.id
        }
    });

    if (images.length >= 10) {
        return res
            .status(403)
            .json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
    }
    const newReview = await ReviewImage.create({
        reviewId: reviews.id,
        url,
    });
    // delete newReview.updatedAt;
    // delete newReview.createdAt;
    return res.json({
        id: newReview.id,
        url,
    });
});




//get all reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {
    let newArr = [];
    // let reviewObj;
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        raw:true,nest:true,
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
    });
    for (let i = 0; i < reviews.length; i++) {
       let review = reviews[i]

        const previewImage = await SpotImage.findByPk(reviews[i].id, {
            where: { spotId: review.spotId, preview: true },
            attributes: ['url'],
            raw: true
        })
        if (previewImage) {
            review.Spot.previewImage = previewImage.url
        }

        if (!previewImage) {
            review.Spot.previewImage = null
        }
        newArr.push(review)
    }

    return res.status(200).json({ Reviews: newArr })
})

//edit a review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const newReview = await Review.findByPk(req.params.reviewId);
    // console.log(newReview, "------------------------------------")
    const { review, stars } = req.body;
    if (newReview) {
        const newReviewObj = newReview.toJSON();
        if (newReviewObj.userId === req.user.id) {
            await newReview.update({ review, stars });
            return res.json(newReview);
        }
        else if (newReviewObj.userId !== req.user.id) {
            return res.status(403).json({
                "message": "Forbidden.Sorry,this is not your review.",
                "statusCode": 403
            });
        }
        else if (!review || !stars) {
            return res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "review": "Review text is required",
                    "stars": "Stars must be an integer from 1 to 5",
                }
            });
        }
    }
    else {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }

})

// delete a review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const delReview = await Review.findByPk(req.params.reviewId)
    if (delReview) {
        const deleteObj = delReview.toJSON();
        if (deleteObj.userId === req.user.id) {
            await delReview.destroy();
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        } else {
            return res.status(403).json({
                "message": "Forbidden.Sorry,this is not your review.",
                "statusCode": 403
            });
        }
    } else {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
});















module.exports = router;
