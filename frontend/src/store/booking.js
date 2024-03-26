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


//reducer:
