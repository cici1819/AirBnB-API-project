const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking, User } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

//get all of th current Useer's Bookings

// router.get('/current', requireAuth, async (req, res, next) => {
    // let newObj;
    // const current = []
    // const curBookings = await Booking.findAll({
    //     where: { userId: req.user.id },
    //     include: {
    //         model: Spot,
    //         attributes: {
    //             exclude: ['createdAt', 'updatedAt', 'description']
    //         },
    //     }

    // })

    // for (let i = 0; i < curBookings.length; i++) {
    //     const prevImgUrl = await SpotImage.findOne({
    //         raw: true,
    //         nest: true,
    //         where: {
    //             spotId: curBookings[i].spotId,
    //             preview: true,
    //         },
    //     })

    //     if (prevImgUrl) {
    //         curBookings[i].Spot.previewImage = prevImgUrl.url
    //     } else {
    //         curBookings[i].Spot.previewImage = null
    //     }
    // }

    // return res.json({
    //     Bookings:current
    // })
    // }
    router.get('/current', requireAuth, async (req, res, next) => {
        const userBookings = await Booking.findAll({
            where: {
                userId: req.user.id
            },
            raw: true
        });

        for (let i = 0; i < userBookings.length; i++) {
            const booking = userBookings[i];
            const spot = await Spot.findOne({
                where: { id: booking.spotId },
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                raw: true
            });

            const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
            spotPreviews.forEach(image => {
                if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
            });
            if (!spot.previewImage) spot.previewImage = null;

            booking.Spot = spot;
        }

        res.json({ Bookings: userBookings });
    });
// });
//edit booking

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    console.log("<<<<<<<<<<<<<<<<<<<<<",req.body)
    let userId = req.user.id;
    let bookingId = parseInt(req.params.bookingId);

    // booking end date is bigger than start date
    if (startDate >= endDate) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }

    //check booking exist
    const booking = await Booking.findByPk(bookingId)
    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }

    //can't edit a booking past the end date
    const today = new Date();
    if (booking.toJSON().endDate < today) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403,
        })
    }


    //can't edit booking to a past date
    if (new Date(startDate) < today || new Date(endDate) < today) {
        res.status(403);
        return res.json({
            message: "booking can't use past date",
            statusCode: 403,
        })
    }
    //booking must belong to current user
    if (booking.toJSON().userId == userId) {

        //no conflict booking
        const spotId = booking.toJSON().spotId;
        const currId = booking.toJSON().id;
        const checkBooking = await Booking.findAll({
            where: {
                spotId,
                id: {
                    [Op.ne]: currId
                },
                [Op.or]:
                    [{
                        startDate: { [Op.lte]: startDate },
                        endDate: { [Op.gte]: endDate },
                    },
                    {
                        startDate: { [Op.gte]: startDate, [Op.lte]: endDate }
                    },
                    {
                        endDate: { [Op.lte]: endDate, [Op.gte]: startDate, }
                    }],
            }
        })

        if (checkBooking.length) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        booking.update({ startDate: startDate, endDate: endDate });
        return res.json(booking);

    } else {
        res.status(403);
        return res.json({
            message: "Booking must belong to the current user",
            statusCode: 403,
        })
    }
})


//edit a booking
// router.put('/:bookingId', requireAuth, async (req, res, next) => {
//     const {startDate, endDate} = req.body
//     const editBooking = await Booking.findByPk(req.params.bookingId);

//     if (editBooking) {
//         const editObj = editBooking.toJSON();
//         if (editObj.userId !== req.user.id) {
//             return res.status(403).json({
//                 "message": "Forbidden.Sorry, this is not your booking",
//                 "statusCode": 403
//             });
//         }
//         let currentDate = new Date();
//         currentDate = currentDate.toISOString();
//         currentDate = currentDate.substring(0, 10)
//         let startDateData = editObj.startDate

//         let endDateData = editObj.endDate


//         if (endDate <= startDate) {
//             return res.status(400).json(
//                 {
//                     "message": "Validation error",
//                     "statusCode": 400,
//                     "errors": {
//                         "endDate": "endDate cannot be on or before startDate",

//                     }
//                 })
//         }
//         if (endDate <= currentDate) {
//             return res
//                 .status(403)
//                 .json({
//                     "message": "Past bookings can't be modified",
//                     "statusCode": 403
//                 })
//         }
//         if (
//             (startDate >= startDateData && startDate <= endDateData) ||
//             (endDate >= startDateData && endDate <= endDateData)) {

//             return res.status(403).json({
//                 "message": "Sorry, this spot is already booked for the specified dates",
//                 "statusCode": 403,
//                 "errors": {
//                     "startDate": "Start date conflicts with an existing booking",
//                     "endDate": "End date conflicts with an existing booking"
//                 }
//             })
//         }
//         const updataBooking = await editBooking.update(
//             {
//                 startDate: startDate,
//                 endDate: endDate
//             }

//         )

//         return res.json(updataBooking);
//     }

//     return res
//         .status(404)
//         .json({
//             "message": "Booking couldn't be found",
//             "statusCode": 404

//         })
// })






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
                "message": "Forbidden.Sorry,this is not your booking",
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
