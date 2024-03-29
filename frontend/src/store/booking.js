import { csrfFetch } from "./csrf";

//action types:
const CREATE_BOOKING = "bookings/createBooking";
const DELETE_BOOKING = "bookings/deleteBooking";
const UPDATE_BOOKING = "bookings/updateBooking";
const GET_BOOKINGS_BY_OWNER = "bookings/getBookingByOwner";
const GET_CURRENT_USER_BOOKINGS = "bookings/getCurrentUserBookings";

//action creator:
export const createBookingAction = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const deleteBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

export const updateBookingAction = (booking, bookingType) => {
    return {
        type: UPDATE_BOOKING,
        booking,
        bookingType
    }
}

export const getBookingsByOwnerAction = (bookings) => {
    return {
        type: GET_BOOKINGS_BY_OWNER,
        bookings
    }
}

export const getCurrentUserBookingsAction = (bookings) => {
    return {
        type: GET_CURRENT_USER_BOOKINGS,
        bookings
    }
}

// thunk：
export const createBookingThunk = (booking, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    const newBooking = await res.json();

    if(res.ok) {
        dispatch(createBookingAction(newBooking))
    }

    return newBooking;
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    //delete booking
    const res = await csrfFetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok) {
        dispatch(deleteBookingAction(bookingId))
    } else {
        return {errors: data}
    }

    return data;
}

export const updateBookingThunk = (bookingId, updatedBooking, bookingType) => async (dispatch) => {
    // update booking:
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedBooking)
    })
    const booking = await res.json();

    //get current spot bookings:
    // const resSpotBookings = await csrfFetch(`/api/spots/${spotId}/bookings`);
    // const boos = await resSpotBookings.json();
    // if(resSpotBookings.ok) {
    //     const bookings = boos.Bookings;
    //     dispatch(getBookingsBySpotIdAction(bookings))
    // }

    //get current user bookings:
    // const resBookings = await csrfFetch('/api/bookings/current');
    // const data = await resBookings.json();
    // if (resBookings.ok) {
    //     const userBookings = data.Bookings;
    //     dispatch(getCurrentUserBookingsAction(userBookings));
    // }

    if (res.ok) {
        dispatch(updateBookingAction(booking, bookingType));
    }

    return booking;
}

export const getBookingByOwnerThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/owner`);

    const data = await res.json();

    if(res.ok) {
        const bookings = data.Bookings;
        dispatch(getBookingsByOwnerAction(bookings));
    }
    return data;
}

export const getCurrentUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`);
    const data = await res.json();
    if (res.ok) {
        const userBookings = data.Bookings;
        dispatch(getCurrentUserBookingsAction(userBookings));
    }
    return data;
}

//reducer:
const initialState = { spotBookings: {}, userBookings: {} }

export default function bookingsReducer (state = initialState, action)  {
    switch (action.type) {
        case GET_BOOKINGS_BY_OWNER: {
            const newSpotBookings = {};
            action.bookings?.forEach(booking => newSpotBookings[booking.id] = booking);
            const newState = {...state, spotBookings: newSpotBookings}
            return newState;
        }
        case DELETE_BOOKING: {
            //delete from spotBookings:
            const newSpotBookings = {...state.spotBookings};
            delete newSpotBookings[action.bookingId];

            //delete from userBookings:
            const newUserBookings = {...state.userBookings};
            delete newUserBookings[action.bookingId];
            return {...state, spotBookings: newSpotBookings, userBookings: newUserBookings}

        }
        case CREATE_BOOKING: {
            const newUserBookings = {...state.userBookings};

            return {...state, userBookings: newUserBookings};
        }
        case GET_CURRENT_USER_BOOKINGS: {
            const newUserBookings = {};
            action.bookings?.forEach(booking => newUserBookings[booking.id] = booking);
            const newState = {...state, userBookings: newUserBookings, spotBookings: {} };
            return newState;
        }
        case UPDATE_BOOKING: {
            const newUserBookings = {...state.userBookings};
            const newSpotBookings = {...state.spotBookings};
            if (action.bookingType === "spot-bookings") {
                newSpotBookings[action.booking.id] = action.booking;
            }
            else if (action.bookingType === "user-bookings") {
                newUserBookings[action.booking.id] = action.booking;
            }
            return {...state, userBookings: newUserBookings, spotBookings: newSpotBookings }
        }
        default:
            return state;
    }
}
