import { csrfFetch } from "./csrf";
import { getSpotByIdAction, updateSpotAction } from "./spots";

//action types:
const GET_REVIEWS_BY_SPOTID = 'reviews/getReviewsBySpotId';
const DELETE_REVIEW = 'reviews/deleteReview';
const CREATE_REVIEW = 'reviews/createReview';
// const GET_CURRENT_USER_REVIEWS = 'reviews/getCurrentUserReviews';

//action creator:
export const getReviewsBySpotIdAction = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        reviews
    }
}

export const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

// thunk
export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    const data = await res.json();

    if(res.ok) {
        const reviews = data.reviews;
        dispatch(getReviewsBySpotIdAction(reviews))
    }
    return data;
}

export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
    //delete review
    const res = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });

    //get current spot
    const spotRes = await csrfFetch(`/api/spots/${spotId}`);
    const currentSpot = await spotRes.json();

    //update new avgRating
    dispatch(getSpotByIdAction(currentSpot));

    if (res.ok) {
        dispatch(deleteReviewAction(reviewId))
    }

    const data = await res.json();
    return data;
}
export const createReviewThunk = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    const newReview = await res.json();
    if(res.ok) {
        dispatch(createReviewAction(newReview))
    }

    //get current spot
    const spotRes = await csrfFetch(`/api/spots/${spotId}`);
    const currentSpot = await spotRes.json();

    //update new avgRating
    dispatch(getSpotByIdAction(currentSpot));

    return newReview;
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
        case DELETE_REVIEW: {
            //delete from spotReviews:
            const newSpotReviews = {...state.spotReviews};
            delete newSpotReviews[action.reviewId];

            //delete from userReviews:
            // const newUserReviews = {...state.userReviews};
            // delete newUserReviews[action.reviewId];
            // return {...state, spotReviews: newSpotReviews, userReviews: newUserReviews}

            return {...state, spotReviews: newSpotReviews}
        }
        case CREATE_REVIEW: {
            const newSpotReviews = {...state.spotReviews};
            newSpotReviews[action.review.id] = action.review;

            return {...state, spotReviews: newSpotReviews};
        }
        default:
            return state;
    }
}
