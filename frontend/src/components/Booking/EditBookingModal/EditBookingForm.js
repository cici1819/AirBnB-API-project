import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingsActions from '../../../store/bookings';
import './EditBookingForm.css';

// THIS COMPONENT IS NESTED IN SPOT BOOKINGS //

function EditBookingForm({ booking, spot, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { bookingId } = useParams();
    let bookingId = booking.id
    const sessionUser = useSelector(state => state.session.user);
    const currUserBookings = useSelector(state => state.bookings?.userBookings);


    const [startDate, setStartDate] = useState(booking?.startDate);
    const [endDate, setEndDate] = useState(booking?.endDate);
    const [validationErrors, setValidationErrors] = useState([]);
    let calNights = parseInt((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
    let cleanFee = 100;
    let serviceFee = 10;
    useEffect(() => {
        dispatch(bookingsActions.loadUserAllBookingsThunk());

    }, [dispatch]);

    useEffect(() => {
        const errors = [];
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

    const handelStartDateChange = async (e) => {
        const  selectedDate= e.target.value;

        setStartDate(selectedDate)


    }

    const handelEndDateChange = async (e) => {
        const selectedDate = e.target.value;

        // const utcDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));

        setEndDate(selectedDate)


    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sessionUser) return alert("You must be logged in to book a spot!");
        if (sessionUser.id === spot.ownerId) return alert("An owner cannot book at his own home");

        const updatedBookingData = {
            startDate,
            endDate
        }
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$ handleSubmit",updatedBookingData)
        try {
            const updatedBooking = await dispatch(bookingsActions.editUserBookingThunk(updatedBookingData, bookingId));
            if (updatedBooking) {
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                setShowModal(false);
                await dispatch(bookingsActions.loadUserAllBookingsThunk()).then(history.push(`/bookings/current`))

            }
        }

        catch (res) {
            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
                setValidationErrors(errors);
            }

        }
    };

    if (!sessionUser) return <Redirect to="/" />
    if (!currUserBookings) return (<h2> Sorry , you have no trips</h2>);

    return (
        <div className='edit-booking-page'>
            <div className='edit-booking-wrap'>
                <div className='booking-top'>
                    <div className='edit-booking-title'>
                        <span>Update your booking
                            {/* for
                            <span className='b-spot-name'>{spot.name} </span>
                            : */}
                        </span>
                    </div>
                    <div className='edit-booking-p-r'>
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

                </div>

                <div className='edit-booking-container'>
                    <form onSubmit={handleSubmit} className="booking-form">
                        {validationErrors.length > 0 && (
                            <ul className="errors-list">
                                {validationErrors.map((error, index) => <li key={index} className="error-li">{error}</li>)}
                            </ul>
                        )}

                        <div className='check-in-out-container'>
                            <div className='check-in-container'>
                                <span className='check-in-text'>CHECK-IN</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={handelStartDateChange}
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
                                    onChange={handelEndDateChange}
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
                            Update Reservation
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
            </div>
        </div>



    );
}
export default EditBookingForm
