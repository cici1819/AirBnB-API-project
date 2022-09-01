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
    const images = await ReviewImage.findAll({
        where: {
          reviewId: reviews.id
        }
      });

      if(images.length >= 10) {
        return res
          .status(403)
          .json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
      }
      const newReview = await ReviewImage.create({
        reviewId:reviews.id,
        url,
      });
      return res.json(newReview);
    });




//get all reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {
    let newArr = [];
    let reviewObj;
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },{
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
        reviewObj = reviews[i].toJSON();

        const previewImage = await SpotImage.findByPk(reviews[i].id, {
            where: { preview: true },
            attributes: ['url'],
            raw:true
        })
        if (previewImage) {
            reviewObj.Spot.previewImage = previewImage.url
        }
        if (!previewImage) {
            reviewObj.Spot.previewImage = null
        }
        newArr.push(reviewObj)
    }

    return res.status(200).json({Reviews: newArr})
})

















module.exports = router;
