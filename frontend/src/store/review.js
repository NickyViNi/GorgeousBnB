import { csrfFetch } from "./csrf";

//action types:
const GET_REVIEWS_BY_SPOTID = 'reviews/getReviewsBySpotId';

//action creator:
export const getReviewsBySpotIdAction = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        reviews
    }
}

// thunk
export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = res.json();
    if(res.ok) {
        const reviews = data.Reviews;
        dispatch(getReviewsBySpotIdAction(reviews))
    }
    return data;
}

//reducer:
const initialState = { spotReviews: {}, userReviews: {} }
export default function reviewsReducer (state = initialState, action)  {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOTID: {
            const newSpotReviews = {};
            action.reviews.forEach(rev => newSpotReviews[rev.id] = rev);
            const newState = {...state, spotReviews: newSpotReviews}
            return newState;
        }
        default:
            return state;
    }
}
