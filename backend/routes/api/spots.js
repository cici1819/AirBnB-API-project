const express = require('express')
const { User, Spot, SpotImage, Review, Sequelize, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {
      //query parameters
//   let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

//   if(!size || size > 20) {
//     size = 20
//   }
//   if(!page) {
//     page = 0
//   }
//     if (page > 10) {
//       page =10
//   }
//   if(size < 0 || page < 0 || minPrice < 0 || maxPrice < 0) {
//     return res
//       .status(400)
//       .json({
//         "message": "Validation Error",
//         "statusCode": 400,
//         "errors": {
//           "page": "Page must be greater than or equal to 0",
//           "size": "Size must be greater than or equal to 0",
//           "maxLat": "Maximum latitude is invalid",
//           "minLat": "Minimum latitude is invalid",
//           "minLng": "Maximum longitude is invalid",
//           "maxLng": "Minimum longitude is invalid",
//           "minPrice": "Maximum price must be greater than or equal to 0",
//           "maxPrice": "Minimum price must be greater than or equal to 0"
//         }
//       })
//   }

//   size = parseInt(size);
//   page = parseInt(page);

//   let pagination = {};
//   if(page >= 0&&page<=10 && size >= 0&&size<=20) {
//     pagination.limit = size;
//     pagination.offset = size * (page - 1);
//   }
    const spots = await Spot.findAll(
    // ...pagination
    );
    // console.log(spots,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    let result = [];
    let spotsObj
    let avgRating
    for (let i = 0; i < spots.length; i++) {
        spotsObj = spots[i].toJSON();
        avgRating = await Review.findAll({
            where: {
                spotId: spots[i].id
            },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })
        spotsObj.avgRating = avgRating[0].dataValues.avgRating;
        const previewImage = await SpotImage.findByPk(spots[i].id, {
            where: { preview: true },
            attributes: ['url']
        })
        if (previewImage) spotsObj.previewImage = previewImage.url
        if (!previewImage) spotsObj.previewImage = null

        result.push(spotsObj)
    }
    return res.json({ Spots: result });
})

// Get all spots  owned by the current user

router.get('/current', requireAuth, async (req, res, next) => {
    let newObj;
    const current = []
    const { user } = req
    const currSpots = await Spot.findAll({
        where: { ownerId: user.id }
    })
    let currAvgrating;

    for (let i = 0; i < currSpots.length; i++) {
        newObj = currSpots[i].toJSON();
        currAvgrating = await Review.findAll({
            where: {
                spotId: currSpots[i].id
            },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })
        newObj.avgRating = currAvgrating[0].dataValues.avgRating;
        const currImage = await SpotImage.findByPk(currSpots[i].id, {
            where: { preview: true },
            attributes: ['url']
        })
        if (currImage) newObj.previewImage = currImage.url
        if (!currImage) newObj.previewImage = null
        current.push(newObj)
    }


    return res.json({ Spots: current })
})

//get all spots detail by id
router.get('/:spotId', requireAuth, async (req, res, next) => {
    const spotDetail = await Spot.findByPk(req.params.spotId, {
        //eagerly loading
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }, {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }
        ]
    }
    );

    //         model: User,
    //
    //     }]

    // console.log(spotResult,"_______________________________")

    if (spotDetail) {
        //     const ower = await User.findByPk({
        //         where: {
        //             id: spotResult.ownerId
        //         },
        //         attributes: ['id', 'firstName', 'lastName']
        //     });

        //     console.log(ower,"*********************************")

        //     console.log(spotDetail,"+++++++++++++++++++++")
        //     ower.id = spotResult.Owner.id;
        //     ower.firstName = spotResult.Owner.firstName;
        //     ower.lastName = spotResult.Owner.lastName;

        const totalRev = await Review.count({
            where: {
                spotId: req.params.spotId
            }
        });

        const avgRating = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: [[Sequelize.fn('AVG', Sequelize.col("stars")), 'avgRating']]
        });
        const spotResult = spotDetail.toJSON();
        spotResult.numReviews = totalRev;
        spotResult.avgStarRating = avgRating[0].toJSON().avgRating;
        res.json(spotResult);

    } else {

        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});








// create spots
router.post('/', requireAuth, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;


    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: [{
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }]
        })
    }
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })
    return res.status(201).json(newSpot);
});

//add an Image to a spot

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const updateSpot = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body;
    if (updateSpot) {
        const spotObj = updateSpot.toJSON();
        if (spotObj.ownerId === req.user.id) {
            const spotImage = await SpotImage.create({
                spotId: req.params.spotId,
                url,
                preview
            });

            const spotImageObj = spotImage.toJSON();

            spotImageObj.spotId = spotImage.spotId
            spotImageObj.url = spotImage.url
            if (spotImage) spotImageObj.previewImage = spotImage.url;
            if (!spotImage) spotImageObj.previewImage = null
            res.json(spotImageObj);
        }
        else (spotObj.ownerId !== req.user.id)
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })

    }
    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
}
);

// edit a spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: [{
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }]
        })
    }
    const editSpot = await Spot.findByPk(req.params.spotId);

    if (editSpot) {
        const editObj = editSpot.toJSON()
        if(editObj.ownerId !== req.user.id){
           return res.status(403).json({
                "message": "Forbidden",
                "statusCode": 403
            });
        } else {
            const newSpot = await editSpot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        });
        return res.json(newSpot)}

    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})
// delete a a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const deleteSpot = await Spot.findByPk(req.params.spotId)
    if (deleteSpot) {
        const deleteObj = deleteSpot.toJSON()
        if (deleteObj.ownerId === req.user.id) {
            await deleteSpot.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
})


// create a review for a spot base on spotId

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const updateSpot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body;
    if (updateSpot) {
        const spotObj = updateSpot.toJSON();
        const spotReview = await Review.findOne({
            where: {
                userId: req.user.id,
                spotId: spotObj.id
            }
        });
        if (spotReview) {
            res.status(403);
            return res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            });

        } else {

            const newReview = await Review.create({
                userId: req.user.id,
                spotId: spotObj.id,
                review,
                stars

            });
            return res.status(201).json(newReview)
        }
    }
    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
}
);

//get a review by spotId
router.get('/:spotId/reviews', requireAuth, async (req, res, next) => {
    // let newArr = [];
    const spots = await Spot.findByPk(req.params.spotId);
    if (spots) {
        const spotObj = spots.toJSON()
        const reviews = await Review.findAll({
            where: {
                spotId: spotObj.id,
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
        });

        return res.json({ Reviews: reviews })
    }
    else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

});










module.exports = router;
