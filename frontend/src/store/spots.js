import { csrfFetch } from "./csrf";

//action type:
const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_BY_ID = 'spots/getSpotById';
const GET_SPOT_BY_USER = 'spots/getSpotByUser';


//(1) Action Creator:

export const loadSpotsAction = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const getSpotByIdAction = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        spot
    }
}

export const getSpotByUserAction = (spots) => {
    return {
        type: GET_SPOT_BY_USER,
        spots
    }
}

//(2)Thunk:
export const loadSpotsThunk = () => async (dispatch) => {

    const res = await csrfFetch('/api/spots');
    const data = await res.json();

    // send spots to reducer
    if(res.ok) {
        const spots = data.Spots;
        dispatch(loadSpotsAction(spots));
        return spots;
    } else {
        return {errors: data};
    }
}

export const getSpotByIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`api/spots/${spotId}`);
    const spot = await res.json();

    //send spot to Reducer:
    if(res.ok) {
        dispatch(getSpotByIdAction(spot));
    }
    return spot;
}

export const getSpotByUserThunk = () => async (dispatch) => {
    const res = await csrfFetch(`api/spot/current`);
    const data = await res.json();

    if (res.ok) {
        const spots = data.Spots;
        dispatch(getSpotByUserAction(spots));
    }

    return data;
}

//(3) Reducer:
const initialState = {
    allSpots: {},
}

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case LOAD_SPOTS: {
            const newSpots = {};
            action.spots.forEach(spot => newSpots[spot.id] = spot);
            const newAllSpots = {...state, currentSpot: null, allSpots: newSpots}
            return newAllSpots;
        }
        case GET_SPOT_BY_ID: {
            const spot = {...state, currentSpot: action.spot};
            return spot;
        }
        case GET_SPOT_BY_USER: {
            const newUserSpots = {};
            action.spots.forEach(spot => newUserSpots[spot.id] = spot);
            const newSpots = {...state, userSpots: newUserSpots};
            return newSpots;
        }
        default:
            return state;
    }
}
