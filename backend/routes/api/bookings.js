const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking, User } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

//get all of th current Useer's Bookings

router.get('/current', requireAuth, async (req, res, next) => {
    let newObj;
    const current = []
    const curBookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            },
        },
    })
    // if (!curBookings) {
    //     return res.status(404).res.json({
    //         "message": "Booking couldn't be found",
    //         "statusCode": 404
    //     })
    // } else {

    for (let i = 0; i < curBookings.length; i++) {
        newObj = curBookings[i].toJSON();
        const currImage = await SpotImage.findByPk(curBookings[i].spotId, {
            where: { preview: true },
            attributes: ['url']
        })
        if (currImage) newObj.Spot.previewImage = currImage.url
        if (!currImage) newObj.Spot.previewImage = null
        current.push(newObj)
    }
    return res.json({ Bookings: current })
    // }
});



//edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const editBooking = await Booking.findByPk(req.params.bookingId);

    if (editBooking) {
        const editObj = editBooking.toJSON();
        if (editObj.userId !== req.user.id) {
            return res.status(403).json({
                "message": "Forbidden.Sorry, it's not your booking",
                "statusCode": 403
            });
        }
        let currentDate = new Date();
        currentDate = currentDate.toISOString();
        currentDate = currentDate.substring(0, 10)
        let startDateData = editObj.startDate.toISOString();
        startDateData = startDateData.substring(0, 10);
        let endDateData = editObj.endDate.toISOString();
        endDateData = endDateData.substring(0, 10);

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
        if (endDate <= currentDate) {
            return res
                .status(403)
                .json({
                    "message": "Past bookings can't be modified",
                    "statusCode": 403
                })
        }
        if (
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
        const updataBooking = await editBooking.update(
            {
                startDate, endDate
            }

        )
        return res.json(updataBooking);
    }

    return res
        .status(404)
        .json({
            "message": "Booking couldn't be found",
            "statusCode": 404

        })
})























// delete a booking

router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const delbooking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot
        }
    });

    if (delbooking) {
        const delObj = delbooking.toJSON();

        if (delObj.userId === req.user.id || delObj.Spot.ownerId === req.user.id) {

            let currentDate = new Date();
            currentDate = currentDate.toISOString();
            currentDate = currentDate.substring(0, 10);

            if (delObj.startDate <= currentDate) {

                return res.status(403).json({
                    "message": "Bookings that have been started can't be deleted",
                    "statusCode": 403
                });
            } else {

                await delbooking.destroy();

                return res.json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                });
            }

        } else {

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

    } else {

        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }
});

















module.exports = router;
