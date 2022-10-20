import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
// import { useHistory } from "react-router-dom";
import * as reviewsActions from "../../store/reviews";
import "./CurrentUserReview.css"

const CurrentUserReviews = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // const history = useHistory();
    const currReviews = useSelector(state => state.reviews.user);
    const currReviewArr = Object.values(currReviews)
    

    useEffect(() => {
        dispatch(reviewsActions.getUserReviews())

    }, [dispatch])




    if (!currReviewArr.length) return (<div className="user-none-reviews">
        <h2>Sorry, you have not created any review yet, please click add a review </h2>
    </div>)


    return (
        <>

            <div className="user-review-div">
                <div className='user-review-title'>
                    <h2 className="review-title">
                        {sessionUser.firstName}'s reviews
                    </h2>
                </div>
                <div className="review-Lists">
                    {currReviewArr.map(review => (

                        <div className="review-detail" key={review.id}>
                            <div className="review-spot" >

                                <div className="r-img">
                                    {/*
                                    <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img> */}
                                    <NavLink to={`/spots/${review.Spot?.id}`} className="r-img">
                                        <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img>

                                    </NavLink>

                                    {/* <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img> */}
                                </div>

                            </div>
                            <div className="user-review-warp">
                                <div className="review-spot-title">
                                    <span id='dots'> * </span>
                                    {review.Spot?.name === null ? "" : `Review for ${review.Spot?.name}`}
                                </div>
                                <div className="u-review-d">
                                    <div className='review-star'>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        <span>{review.stars}</span>
                                    </div>
                                    <div className="review-contents-c">
                                        {review.review}
                                    </div>

                                </div>


                                <div className="deleteReview-div">
                                    {(sessionUser && sessionUser.id === review.userId) && (
                                        <button className="deleteReview-button" onClick={() => {
                                            if (window.confirm('Do you want to delete?')) {
                                             dispatch(reviewsActions.removeAReview(review.id));
                                                // history.push('/reviews/current')
                                            }

                                        }
                                        }>Delete Review</button>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}


























export default CurrentUserReviews
