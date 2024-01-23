import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';

//(1) Action Creator:

export const loadSpotsAction = (spots) => {
    return {
        type: LOAD_SPOTS,
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

//(3) Reducer:
const initialState = {
    allSpots: {},
}

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case LOAD_SPOTS: {
            const newSpots = {};
            action.spots.forEach(spot => newSpots[spot.id] = spot);
            const newAllSpots = {...state, allSpots: newSpots}
            return newAllSpots;
        }
        default:
            return state;
    }
}
