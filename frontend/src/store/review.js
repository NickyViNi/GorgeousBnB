import { csrfFetch } from "./csrf";

//action types:
const GET_REVIEWS_BY_SPOTID = 'reviews/getReviewsBySpotId';

//action creator:
export const getReviewsBySpotIdAction = (spot) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        spot
    }
}

// thunk
export const getReviewsBySpotIdThunk = () => async (dispatch) => {
    const res = await csrfFetch()
}
