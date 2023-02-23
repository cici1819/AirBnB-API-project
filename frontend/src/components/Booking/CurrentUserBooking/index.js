import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import * as bookingsActions from '../../../store/bookings';
import AddReviewFormModal from '../../AddReviewModal/index';
import './CurrentUserBooking.css';
import EditBookingFormModal from '../EditBookingModal';

function CurrentUserBookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const bookings = Object.values(useSelector(state => state.bookings?.userBookings))
    const currUser = useSelector(state => state.session.user)
    const [isloaded, setIsLoaded] = useState(false);
    //  console.log("bookongs$$$$$$$$$$$$$$$$$$$",bookings)
    useEffect(() => {
        dispatch(bookingsActions.loadUserAllBookingsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);



    if (!currUser) return <Redirect to='/' />

    if (bookings.length === 0) {
        return (
            <div className='none-booking-title'>
                <h2 >No Trips yet</h2>
            </div>
        )
    }


    const handleDelete = async (bookingId) => {
        if (window.confirm('Do you want to cancel this reservation?')) {
            await dispatch(bookingsActions.deleteBookingThunk(bookingId))
            await dispatch(bookingsActions.loadUserAllBookingsThunk())
        }
    }


    return (
        <div className='user-booking-page'>
            {isloaded && (
                <div className='user-booking-page-inner'>

                    <h2 className='user-booking-page-title'>{currUser.firstName}'s  trips </h2>
                    <div className='user-booking-lists'>
                        {bookings.length > 0 && bookings?.map(booking => (
                            <div key={booking.id} className='user-booking-detail'>
                                <div className='booking-spot'>
                                    <Link to={`/spots/${booking.spotId}`}>
                                        <div className='Booking-spot-image'>
                                            <img className='spot-image-booking' src={booking.Spot?.previewImage} alt='Spot preview image' />
                                        </div>
                                    </Link>
                                    <div className='user-booking-spotInfo'>
                                        <div className='user-booking-info-location'>
                                            {`${booking.Spot.city}, ${booking.Spot.state}`}
                                        </div>
                                        <div className='booking-spots-name'>
                                            {`${booking.Spot.name}`}
                                        </div>
                                        <div className='booking-spot-time'>{`${booking.startDate.slice(0, 10)} to ${booking.endDate.slice(0, 10)}`}</div>
                                        <div className='total-info-booking'>{`Address: ${booking.Spot.address}, ${booking.Spot.city}, ${booking.Spot.state}`}</div>
                                    </div>
                                </div>
                                <div className='user-bookings-delete-button'>
                                    {new Date() < new Date(booking.startDate) && (
                                        <div className='booking-setting-div'>
                                            <button onClick={(e) => handleDelete(booking.id)} className="b-delete"> Cancel Reservation </button>
                                            <EditBookingFormModal booking={booking} spot={booking.Spot} />
                                        </div>

                                    )}

                                    {new Date() >= new Date(booking.endDate) && (
                                        <div className='user-bookings-review'>
                                            <AddReviewFormModal spot={booking.Spot} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )


}

export default CurrentUserBookings;
