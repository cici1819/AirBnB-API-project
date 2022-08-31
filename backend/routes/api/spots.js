const express = require('express')
const { User, Spot, SpotImage, Review, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
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
        console.log("preview image:", previewImage);
        spotsObj.previewImage = previewImage?.url
        result.push(spotsObj)
    }
    return res.json({ Spots: result });
})

// Get all spots  owned by the current user

router.get('/current', requireAuth, async (req, res, next) => {
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
        newObj.previewImage = currImage.url
        current.push(newObj)
    }


    return res.json({ Spots: current })
})

//get all spots detail by id
router.get('/:spotId', requireAuth, async (req, res, next) => {
    const spotDetail = await Spot.findByPk(req.params.spotId, {
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }, {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    });
    if (spotDetail) {

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
    console.log("running...", req.body);
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
                "price": "Price is required"
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

//


















module.exports = router;
