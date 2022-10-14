import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as reviewsActions from "../../store/reviews";
import "./CurrentUserReview.css"

const CurrentUserReviews = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const currReviews = useSelector(state => state.reviews.user);
    const currReviewArr = Object.values(currReviews)
    useEffect(() => {
        dispatch(reviewsActions.getUserReviews())
    }, [dispatch])


    if (!currReviewArr.length) return (<div className="user-none-reviews">
        <h2>Sorry, you have not created any review yet, please click add a review </h2>
    </div>)

    return (
        <div className="user-review-div">
            <div className='user-review-title'>
                <h2 className="review-title">
                    {sessionUser.firstName}'s reviews
                </h2>
            </div>
            <div className="review-Lists">
                {currReviewArr.map(review => (
                    <div className="review-details" key={review.id}>
                        <div className="review-spot" >
                            <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img>
                        </div>
                        <div className="review-spot-title">
                            {review.Spot?.name === null ? "" : `Review for ${review.Spot?.name}`}
                        </div>
                        <div className="review-contents">
                            {review.review}
                        </div>
                        <div className='review-star'>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <span>{review.stars}</span>
                        </div>
                        <div className="deleteReview-div">
                            {(sessionUser && sessionUser.id === review.userId) && (
                                <button className="deleteReview-button" onClick={() => dispatch(reviewsActions.removeAReview(review.id))}>Delete Review</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}


























export default CurrentUserReviews
