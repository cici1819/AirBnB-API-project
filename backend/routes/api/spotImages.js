const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');

const router = express.Router();


//DELETE a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const delSpotImage = await SpotImage.findByPk(req.params.imageId, {
        include: [{
            model: Spot,
            attributes: ['ownerId']
        }]
    })
    if (delSpotImage) {

        const deleteObj = delSpotImage.toJSON();
        if (deleteObj.Spot.ownerId === req.user.id) {
            await delSpotImage.destroy();
            return res.status(200).json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {

            return res.status(403).json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

    } else {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
});


module.exports = router;
