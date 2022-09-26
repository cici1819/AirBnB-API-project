import { csrfFetch } from "./csrf";
//  action type
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const ONE_SPOT = "spots/ONE_SPOT";
const USER_SPOTS = "spots/USER_SPOTS";
const ADD_SPOT = "spots/ADD_SPOT";
const ADD_IMG = "spots/ADD_IMG";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";


//action creators
const loadAllSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const loadOneSpot = (spot) => ({
    type: ONE_SPOT,
    spot
})

const loadUserSpots = (spots) => ({

    type: USER_SPOTS,
    spots

})
const addImg = (spotId, img) => ({
    type: ADD_IMG,
    spotId,
    img
})


const addOneSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})
const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot

})
const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

//Thunk action get all spots
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAllSpots(spots));
    }
}

//Thunk action get spots by id

export const getOneSpot = (spotId) => async dispatch => {
    // console.log("running$$$$$$$$$$$$$$$")
    const response = await csrfFetch(`/api/spots/${spotId}`);
    // console.log(response,"action!!!!!!!!!!!!!!!!!!")
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadOneSpot(spot));
        // console.log(spot,"????????????????????????/")
    }

}

//Thunk action get current user spots

export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);

    if (response.ok) {
        const userSpots = await response.json();
        dispatch(loadUserSpots(userSpots));
    }
}

// Thunk action add img to a spot by id

// export const addSpotImg = (spotId, img) => async dispatch => {
//     img = { url, preview }
//     const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ img }),
//     })
//     if (response.ok) {
//         const image = await response.json();
//         dispatch(addImg(img.url, spotId))
//         return image
//     }

// }

// Thunk action add a spot
export const addSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addOneSpot(newSpot));
        return newSpot;
    }
}

// Thunk action update a spot

export const editSpot = (spotId, spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
}

// Thunk action delete a spot
export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const successMessage = await response.json();
        dispatch(deleteSpot(spotId));
        return successMessage;
    }
}



const initialState = {
    allSpots: {},
    spot: {}
};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
        case USER_SPOTS:
            newState = { ...state };
            let allSpots = {};
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            // console.log('ALL SPOTS REDUCED', allSpots)
            newState.allSpots = allSpots;
            return newState;

            // console.log('newState++++++++++++++++++++++++ ', newState)

        case ONE_SPOT:
            newState = { ...state };
            newState.spot= action.spot
              console.log("%%%%%%%%%%%%%%%%%%%%%%%",action.spot)
            return newState;

        // case ADD_IMG:
        //     newState = { ...state }
        //     newState.spot.SpotImages = [action.spotId.url]
        //     return newState;



        case ADD_SPOT:
            newState = { ...state };
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot };
            newState.spot = { ...state.spot, ...action.spot }
            return newState;
        case UPDATE_SPOT:
            newState = { ...state };
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot }
            newState.spot = { ...state.spot, ...action.spot };
            return newState;
        case DELETE_SPOT:
            newState = { ...state };
            delete newState[action.spotId]
            return newState;

        default:
            return state;
    }
}

export default spotsReducer;
