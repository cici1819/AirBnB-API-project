const express = require('express')
const { User, Spot, SpotImage, Review, Sequelize, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { compare } = require('bcryptjs');
const { Op } = require("sequelize");
const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {
    //query parameters
    let { page, size, minLat,
        maxLat, minLng, maxLng,
        minPrice, maxPrice } = req.query;
    if (!page || isNaN(page)) page = 1
    if (!size || isNaN(size) || size > 20) size = 20

    if (page > 10) page = 10;
    if (size < 0 || page < 0) {
        return res
            .status(400)
            .json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1"
                }
            })
    };
    size = parseInt(size);
    page = parseInt(page);
    if (page === 0 || size === 0) {
        page = 1
        size = 20
    };

    let pagination = {};
    if (page > 0 && size > 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }


    let queryParames = [];

    if (minLat) {
        minLat = parseFloat(minLat);
        if (minLat < -90 || minLat > 90) {
            return res
                .status(400)
                .json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "minLat": "Minimum latitude is invalid"
                    }
                })
        } else {
            queryParames.push({
                lat: { [Op.gte]: minLat }
            })
        }
    };

    if (maxLat) {
        maxLat = parseFloat(maxLat);
        if (maxLat < -90 || maxLat > 90) {
            return res
                .status(400)
                .json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "maxLat": "Maximum latitude is invalid"
                    }
                })
        } else {
            queryParames.push({
                lat: { [Op.lte]: maxLat }
            })
        }
    };



    if (minLng) {
        minLng = parseFloat(minLng);
        if (minLng < -180 || minLat > 180) {
            return res
                .status(400)
                .json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "minLat": "Minimum longitude is invalid"
                    }
                })
        } else {
            queryParames.push({
                lng: { [Op.gte]: minLng }
            })
        }
    };

    if (maxLng) {
        maxLng = parseFloat(maxLng);
        if (maxLng < -180 || maxLat > 180) {
            return res
                .status(400)
                .json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "minLat": "Maximum longitude is invalid"
                    }
                })
        } else {
            queryParames.push({
                lat: { [Op.lte]: maxLng }
            })
        }
    }

    if (minPrice) {
        minPrice = parseFloat(minPrice);
        if (minPrice < 0) {
            return res
                .status(400)
                .json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "minPrice": "Minimum price must be greater than or equal to 0"
                    }
                })
        } else {
            queryParames.push({
                price: { [Op.gte]: minPrice }
            })
        }
    }


    if (maxPrice) {
        maxPrice = parseFloat(maxPrice);
        if (maxPrice < 0) {
            return res
                .status(400)
                .json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "minPrice": "Maximum price must be greater than or equal to 0"
                    }
                })
        } else {
            queryParames.push({
                price: { [Op.lte]: maxPrice }
            })
        };
    }

    const spots = await Spot.findAll({
        where: {
            [Op.and]: queryParames
        },
        ...pagination
    });
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
        spotsObj.avgRating = Number(parseFloat(avgRating[0].dataValues.avgRating).toFixed(2));
        // const previewImage = await SpotImage.findByPk(spots[i].id, {
        //     where: { preview: true },
        //     attributes: ['url']
        // })

        const previewImage = await SpotImage.findAll({
            where: {
                preview: true,
                spotId: spotsObj.id
            },
            attributes: ['url']
        })
        if (previewImage) spotsObj.previewImage = previewImage[0].url
        if (!previewImage) spotsObj.previewImage = null
        result.push(spotsObj)
    }
    return res.json({ Spots: result, page, size });
})


// Get all spots  owned by the current user

router.get('/current', requireAuth, async (req, res, next) => {
    let newObj;
    const current = []
    const currSpots = await Spot.findAll({
        where: { ownerId: req.user.id }
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
        newObj.avgRating = Number(parseFloat(currAvgrating[0].dataValues.avgRating).toFixed(2));
        // const currImage = await SpotImage.findByPk(currSpots[i].id, {
        //     where: { preview: true },
        //     attributes: ['url']
        // })
        const currImage = await SpotImage.findAll({
            where: {
                preview: true,
                spotId: newObj.id
            },
            attributes: ['url']
        })
        if (currImage) newObj.previewImage = currImage[0].url
        if (!currImage) newObj.previewImage = null
        current.push(newObj)
    }


    return res.json({ Spots: current })
})

//get all spots detail by id
router.get('/:spotId', async (req, res, next) => {
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
        spotResult.avgStarRating = Number(parseFloat(avgRating[0].toJSON().avgRating).toFixed(2));
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
        //ower
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

//add an preiewImage to a spot


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

            delete spotImageObj.updatedAt;
            delete spotImageObj.createdAt;
            delete spotImageObj.spotId;
            return res.json(spotImageObj);
        }
        else (spotObj.ownerId !== req.user.id)
        return res.status(403).json({
            "message": "Forbidden. Sorry,you are not the owner",
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
        if (editObj.ownerId !== req.user.id) {
            return res.status(403).json({
                "message": "Forbidden. Sorry,you are not the owner",
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
            return res.json(newSpot)
        }

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
                "message": "Forbidden.Sorry,you are not the owner",
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
        // if (spotObj.ownerId === req.user.id) {
        //     return res.status(403).json({
        //         "message": "Forbidden.Sorry,you are the owner",
        //         "statusCode": 403
        //     })
        // }
        const spotReview = await Review.findOne({
            where: {
                userId: req.user.id,
                spotId: spotObj.id
            }
        });
        if (spotReview) {
            return res.status(403).json({
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
router.get('/:spotId/reviews', async (req, res, next) => {

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

// get all Bookings for a spot based on the spotsId
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spots = await Spot.findByPk(req.params.spotId);
    if (spots) {
        const spotsObj = spots.toJSON()
        if (spotsObj.ownerId === req.user.id) {
            const spotBookings = await Booking.findAll({
                where: {
                    spotId: spotsObj.id
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            })
            return res.json({ Bookings: spotBookings });
        } else {
            const userBookings = await Booking.findAll({
                where: {
                    spotId: spotsObj.id,
                    userId: req.user.id
                },
                attributes: ['spotId', 'startDate', 'endDate']
            });

            return res.json({ Bookings: userBookings });
        }
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})

// create a booking by spotId

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const spots = await Spot.findByPk(req.params.spotId);
    if (spots) {
        const spotsObj = spots.toJSON()
        if (spotsObj.ownerId === req.user.id) {
            return res.status(403).json({
                "message": "Forbidden.Sorry,you are the owner",
                "statusCode": 403
            })
        }
        const booking = await Booking.findAll({
            where: {
                spotId: spotsObj.id
            }
        })

        let currentDate = new Date();
        currentDate = currentDate.toISOString();
        currentDate = currentDate.substring(0, 10);
        if (booking.length) {
            for (let i = 0; i < booking.length; i++) {
                let bookingObj = booking[i].toJSON();
                let startDateData = bookingObj.startDate
                let endDateData = bookingObj.endDate
                if (endDate <= startDate) {
                    return res.status(400).json(
                        {
                            "message": "Validation error",
                            "statusCode": 400,
                            "errors": {
                                "endDate": "endDate cannot be on or before startDate",

                            }
                        })
                }
                if (startDate <= currentDate ||
                    (startDate >= startDateData && startDate <= endDateData) ||
                    (endDate >= startDateData && endDate <= endDateData)) {
                    return res.status(403).json({
                        "message": "Sorry, this spot is already booked for the specified dates",
                        "statusCode": 403,
                        "errors": {
                            "startDate": "Start date conflicts with an existing booking",
                            "endDate": "End date conflicts with an existing booking"
                        }
                    })
                }
            }

        }
        const newbooking = await Booking.create({
            spotId: spotsObj.id,
            userId: req.user.id,
            startDate: startDate,
            endDate: endDate
        })

        return res.status(200).json(newbooking)

    }
    else {
        res.status(404).json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }
})











module.exports = router;
