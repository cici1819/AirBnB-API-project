
const express = require('express');

const {requireAuth} = require('../../utils/auth');
const { ReviewImage,Review } = require('../../db/models');

const router = express.Router();


//DELETE a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const delReviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: [{
            model: Review,
            attributes: ['userId','spotId']
        }]
    })
    if (delReviewImage) {
        const deleteObj = delReviewImage.toJSON();
        // console.log(deleteObj,"**************************************")
        // if(deleteObj.reviewId)
        if (deleteObj.Review.userId === req.user.id) {
        await delReviewImage.destroy();
        return res.status(200).json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {

          return  res.status(403).json({
                "message": "Forbidden.Sorry,this is not your review",
                "statusCode": 403
            });
        }
     } else (!delReviewImage)
        return res.status(404).json({
                "message": "Review Image couldn't be found",
                "statusCode": 404
            })


})









module.exports = router;
