import { csrfFetch } from "./csrf";

//action types:
const CREATE_BOOKING = "bookings/createBooking";

//action creator:
export const createBookingAction = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
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

//reducer:
const initialState = { spotBookings: {}, userBookings: {} }

export default function bookingsReducer (state = initialState, action)  {
    switch (action.type) {
        case GET_BOOKINGS_BY_SPOTID: {
            const newSpotBookings = {};
            action.bookins.forEach(booking => newSpotBookings[booking.id] = booking);
            const newState = {...state, spotBookings: newSpotBookings}
            return newState;
        }
        case DELETE_BOOKING: {
            //delete from spotBookings:
            const newSpotBookings = {...state.spotBookings};
            delete newSpotBookings[action.bookingId];

            //delete from userBookings:
            const newUserBookings = {...state.userBookings};
            delete newUserBookings[action.BookingId];
            return {...state, spotBookings: newSpotBookings, userBookings: newUserBookings}

        }
        case CREATE_BOOKING: {
            const newSpotBookings = {...state.spotBookings};
            newSpotBookings[action.booking.id] = action.booking;

            return {...state, spotBookings: newSpotBookings};
        }
        case GET_CURRENT_USER_BOOKINGS: {
            const newUserBookings = {};
            action.bookings.forEach(booking => newUserBookings[booking.id] = booking);
            const newState = {...state, userBookings: newUserBookings, spotBookings: {} };
            return newState;
        }
        case UPDATE_BOOKING: {
            const newUserBookings = {...state.userBookings};
            newUserBookings[action.booking.id] = action.booking;
            return {...state, userBookings: newUserBookings }
        }
        default:
            return state;
    }
}
