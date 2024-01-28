import { csrfFetch } from "./csrf";

//action type:
const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_BY_ID = 'spots/getSpotById';
const GET_SPOT_BY_USER = 'spots/getSpotByUser';
const CREATE_NEW_SPOT = 'spots/createNewSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const UPDATE_SPOT = 'spots/updateSpot';


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

export const createNewSpotAction = (spot) => {
    return {
        type: CREATE_NEW_SPOT,
        spot
    }
}

export const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const updateSpotAction = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
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
        // console.log("get all spots from loadSpotsThunk: ", spots)
        return spots;
    } else {
        return {errors: data};
    }
}

export const getSpotByIdThunk = (spotId) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}`);

    const spot = await res.json();

    //send spot to Reducer:
    if(res.ok) {
        dispatch(getSpotByIdAction(spot));
    }

    return spot;
}

export const getSpotByUserThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/current`);
    const data = await res.json();

    if (res.ok) {
        const spots = data.Spots;
        dispatch(getSpotByUserAction(spots));
    }

    return data;
}

export const createNewSpotThunk = (newSpot, images) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newSpot)
    })

    const spot = await res.json();

    if(res.ok) {
        dispatch(createNewSpotAction({
            ...spot,
            avgRating: 'New',
            previewImage: images[0]
        }))


        //POST spot images to server:
        for (let i = 0; i < images.length; i++) {
            let preview = false;
            if (i === 0) { preview = true; }

            if (images[i]) {
                await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    header: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        spotId: spot.id,
                        url: images[i],
                        preview: preview
                    })
                })
            }
        }
    }

    return spot;
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch (`/api/spots/${spotId}`, {
        method: "DELETE",
    })

    if (res.ok) {
        dispatch(deleteSpotAction(spotId));
    }

    const data = await res.json()
    // console.log("form delete spot thunk....res.json(): ", data)
    return data;

}

export const updateSpotThunk = (updatedSpot, images, spotId) => async (dispatch) => {
    //put spot by id:
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedSpot)
    })

    const spot = await res.json();

    if(res.ok) {
        dispatch(updateSpotAction(spot))

        //get the spot old images:
        const currentSpotFetch = await csrfFetch(`/api/spots/${spot.id}`);
        const currentSpot = await currentSpotFetch.json();
        const currentSpotImages = currentSpot.SpotImages;
        //delete spot old images:
        for (let image of currentSpotImages) {
            csrfFetch(`/api/spot-images/${image.id}`, {
                method: 'DELETE'
            });
        }

        //POST new spot images to server:
        for (let i = 0; i < images.length; i++) {
            let preview = false;
            if (i === 0) { preview = true; }

            if (images[i]) {
                await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    header: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        spotId: spot.id,
                        url: images[i],
                        preview: preview
                    })
                })
            }
        }
    }

    return spot;
}

//(3) Reducer:
const initialState = {
    allSpots: {},
    currentSpot: null,
    userSpots: {}
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
        case CREATE_NEW_SPOT: {
            const newAllSpots = {...state.allSpots};
            newAllSpots[action.spot.id] = action.spot;
            const newSpots = {...state, allSpots: newAllSpots};
            return newSpots;
        }
        case DELETE_SPOT: {
            // delete it from state.allSpots:
            const allSpotsNew = {...state.allSpots};
            delete allSpotsNew[action.spotId];

            // delete is from state.userSpots:
            const userSpotsNew = {...state.userSpots};
            delete userSpotsNew[action.spotId];

            const newSpots = {...state, allSpots: allSpotsNew, userSpots: userSpotsNew};
            return newSpots;
        }
        case UPDATE_SPOT: {
            const newAllSpots = {...state.allSpots};
            newAllSpots[action.spot.id] = action.spot;
            const newSpots = {...state, allSpots: newAllSpots}
            return newSpots;
        }
        default:
            return state;
    }
}
