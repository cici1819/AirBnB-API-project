import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingsActions from '../../../store/bookings';
import './CreateBooking.css';


function CreateBooking({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const spotId = spot.id
    let calNights = parseInt((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
    let cleanFee = 100;
    let serviceFee = 10;
    let errors= []
    useEffect(() => {

        const today = new Date(Date.now());
        const parsedStartDate = new Date(startDate + "T00:00:00");
        const parsedEndDate = new Date(endDate + "T00:00:00");

        if (today > parsedStartDate || today > parsedEndDate) {
            errors.push("You cannot book past dates or the current day");
        }
        if (parsedStartDate > parsedEndDate) {
            errors.push("The check in date cannot be after the check out date");
        }

        setValidationErrors(errors);

    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert("You must be logged in to book a spot!");
        if (user.id === spot.ownerId) return alert("An owner cannot book at his own home");

        const data = {
            spotId,
            startDate,
            endDate
        }
        try {
            const createdBooking = await dispatch(bookingsActions.createSpotBookingThunk(data));
            if (createdBooking) {
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                dispatch(bookingsActions.loadSpotAllBookingsThunk(spotId));

                history.push(`/bookings/current`);
            }
        }

        catch (res) {
            const data = await res.json();
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);
        }
    };


    return (

        <div className='booking-div'>
            <div className='booking-top'>
                <div className="price-side-div">
                    <span className='s-number'>{`$${spot.price}`}</span>
                    <span className='s-night'> night</span>
                </div>

                <div className='review-side-div'>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                    <span className='dots'> • </span>
                    <span className='numReviews'>{spot.numReviews} reviews
                    </span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="booking-form">
                {validationErrors.length > 0 && (
                    <ul className="errors-list">
                        {validationErrors.map((idx, error) => <li key={idx} >{error}</li>)}
                    </ul>
                )}

                <div className='check-in-out-container'>
                    <div className='check-in-container'>
                        <span className='check-in-text'>CHECK-IN</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            min={`${new Date().toLocaleDateString('en-ca')}`}
                            max={`${new Date().getFullYear() + 2}-12-31`}
                            className='form-field'
                            id='check-in'
                        />
                    </div>
                    <div className='check-out-container'>
                        <span className='check-out-text'>CHECKOUT</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            min={`${new Date(new Date(startDate).getTime() + (1000 * 3600 * 48)).toLocaleDateString('en-ca')}`}
                            max={`${new Date().getFullYear() + 2}-12-31`}
                            className='form-field'
                            id='check-out'
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    id='button-booking-submit'
                    className='submit-button'
                    disabled={validationErrors.length}
                >
                    Reserve
                </button>
            </form>
            <div className='booking-buttom'>
                <div className="booking-form-nocharge-container">
                    <div className="booking-form-nocharge">
                        You won't be charged yet
                    </div>
                </div>
                <div className='booking-form-bttm-r1'>
                    <div className='booking-form-bttm-left'>{`$${spot.price}`} x {calNights < 0 || isNaN(calNights) ? 0 : calNights} nights</div>
                    <div className='booking-form-bttm-right'>{`$${spot.price * (calNights < 0 || isNaN(calNights) ? 0 : calNights)}`}</div>
                </div>
                <div className='booking-form-bttm-r1'>
                    <div className='booking-form-bttm-left'>Cleaning fee</div>
                    <div className='booking-form-bttm-right'>{`$${cleanFee}`} </div>
                </div>
                <div className='booking-form-bttm-r1'>
                    <div className='booking-form-bttm-left'>Service fee</div>
                    <div className='booking-form-bttm-right'>{`$${serviceFee * (calNights < 0 || isNaN(calNights) ? 0 : calNights)}`} </div>
                </div>
                <div className='booking-form-bttm-r4'>
                    <div className='booking-form-bttm-left2'>Total before taxes</div>
                    <div className='booking-form-bttm-right2'>{`$${spot.price * (calNights < 0 || isNaN(calNights) ? 0 : calNights) + serviceFee * (calNights < 0 || isNaN(calNights) ? 0 : calNights) + cleanFee}`} </div>
                </div>
            </div>

        </div>


    );
}

export default CreateBooking
