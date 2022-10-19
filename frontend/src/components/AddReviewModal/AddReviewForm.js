import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/reviews"
import "./AddReviewForm.css"

const AddReviewForm = ({ setShowModal}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    // console.log("%%%%%%%%%%%%%%% SpotId", spotId)
    //   const spot = useSelector(state => state.spots.spot)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // if (!sessionUser) {
    //     alert("Please log in or Sign Up");
    //     history.push("/");
    // }
    useEffect(() => {
        const errors = [];
        if (!review.length) {
            errors.push("Review text is required")
        } else if (review.length > 500) {
            errors.push("Review text should be less than 500 characters")
        }

        if (!Number(stars) || Number(stars) > 5 || Number(stars) < 1) errors.push("Star must between 1-5")
        setValidationErrors(errors);
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        // if (validationErrors.length) return alert(`Validation Erroes Cannot Submit`);
        const newReview = {
            review,
            stars
        };
        const addReview = await dispatch(reviewsActions.createAReview(newReview, spotId)).catch(

            async (res) => {

                if (res.status === 403) {
                    setValidationErrors(["You have already added a review for this spot"])
                }
                if (res.status === 404) {
                    setValidationErrors(["Spot couldn't be found"]);
                }
                if (res.status === 400) {
                    setValidationErrors(["Validation Errors Cannot Submit"]);
                }
            });
        // console.log("addAReview in add review^^^^^^^^^^^", addReview)
        if (addReview) {
            setValidationErrors([]);
            setShowModal(false);
            // history.push(`/spots/${spotId}`)
            history.push('/reviews/current')

        }
    }

    return (
        <div className='review-form-div'>
            <form className='review-form' onSubmit={handleSubmit}>
                <div className='review-form-title'>
                    <h3>Add a Review</h3>
                </div>

                <div className='review-form-content'>
                    <div className='review-input'>
                        <div className='input-m '>
                            Review content
                        </div>
                        <input
                            className='review-text'
                            placeholder="1-500 characters"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-m '>
                        Review stars
                    </div>
                    <input
                        className='review-star'
                        type='number'
                        min='1'
                        max='5'
                        placeholder="Stars:1-5"
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                    />
                </div>

                {hasSubmitted && validationErrors.length > 0 && (
                    <div className='r-errorlist-div'>
                        <ul className='error-list'>
                            {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
                        </ul>
                    </div>
                )}

                <div className='review-button-div'>
                    <button id='review-button' type='submit'>Add Review</button>
                </div>
            </form>
        </div>
    )

}










export default AddReviewForm
