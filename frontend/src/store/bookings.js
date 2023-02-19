import { csrfFetch } from './csrf';

const LOAD_SPOT_ALL_BOOKINGS = 'bookings/loadSpotAllBookings';
const LOAD_USER_ALL_BOOKINGS = 'bookings/loadUserAllBookings';
const CREATE_SPOT_BOOKING = 'bookings/createSpotBooking';
const EDIT_USER_BOOKING = 'bookings/editUserBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';


//Actions

const loadSpotAllBookingsAction = (bookings) => {
    return {
        type: LOAD_SPOT_ALL_BOOKINGS,
        bookings,
    }
}


const loadUserAllBookingsAction = (bookings) => {
    return {
        type: LOAD_USER_ALL_BOOKINGS,
        bookings,
    }
}

const createSpotBookingAction = (booking) => {
    return {
        type: CREATE_SPOT_BOOKING,
        booking,
    }
}

const editUserBookingAction = (booking) => {
    return {
        type: EDIT_USER_BOOKING,
        booking,
    }
}

const deleteBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId,
    }
}


// thunk: get  all bookings by current spot
export const loadSpotAllBookingsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotAllBookingsAction(data.Bookings));
        return data;
    }
};

// thunk: get  all bookings by current user
export const loadUserAllBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const data = await response.json();
        // console.log('thunk bookings--------------', data)
        dispatch(loadUserAllBookingsAction(data.Bookings));
        return data;
    }
};

// thunk: create a  booking
export const createSpotBookingThunk = (data) => async (dispatch) => {
    try {
        const { spotId, startDate, endDate } = data
        // console.log('backend spotId-------------------', spotId)
        const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate }),
        })
        if (response.ok) {
            const booking = await response.json();
            await dispatch(createSpotBookingAction(booking));
            return booking;
        }
    } catch (err) {
        // console.log('thunk err========================', err);
        throw err;
    }
}

// thunk: edit booking
export const editUserBookingThunk = (booking, bookingId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(booking)
        })

        if (response.ok) {
            const data = await response.json();
            dispatch(editUserBookingAction(data));
            return data
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// thunk: delete booking
export const deleteOneBookingThunk = (bookingId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            dispatch(deleteBookingAction(bookingId));
            return response;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//reducer
const initialState = { allBookings: {}, singleBooking: {}, userBookings: {} };

const bookingsReducer = (state = initialState, action) => {
    // console.log('Booking reducer action:', action); // added console log here
    let newState = {};
    switch (action.type) {
        case LOAD_SPOT_ALL_BOOKINGS:
            let allBookings = {};
            action.bookings.forEach(booking => { allBookings[booking.id] = booking });
            newState = { ...state };
            newState.allBookings = allBookings;
            return newState;

        case LOAD_USER_ALL_BOOKINGS:
            let userBookings = {};
            action.bookings.forEach(booking => { userBookings[booking.id] = booking });
            newState = { ...state };
            newState.userBookings = userBookings;
            return newState;

        case CREATE_SPOT_BOOKING:
            newState = { ...state, allBookings: { ...state.allBookings }, singleBooking: {} };
            const newBooking = { ...action.booking };
            newState.allBookings[action.booking.id] = newBooking;
            newState.singleBooking = newBooking;
            return newState;

        case EDIT_USER_BOOKING:
            newState = { ...state };
            newState.allBookings = { ...state.allBookings, [action.booking.id]: { ...state.allBookings[action.booking.id], ...action.booking } }
            newState.singleBooking = { ...state.singleBooking, ...action.booking }
            return newState;

        case DELETE_BOOKING:
            newState = { allBookings: { ...state.allBookings }, singleBooking: { ...state.singleBooking }, userBookings: { ...state.userBookings } };
            // console.log('booking delete id-----------', action.id)
            delete newState.allBookings[action.id];
            delete newState.userBookings[action.id];
            if (action.id == newState.singleBooking.id) { newState.singleBooking = {} }
            return newState;

        default:
            return state;
    }
}

export default bookingsReducer;
