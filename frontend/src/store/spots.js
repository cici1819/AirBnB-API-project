import { useParams } from "react-router-dom";
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

const addImg = (spot, img) => ({
    type: ADD_IMG,
    payload: {
        spot,
        img
    }

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
        return spots;
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
        dispatch(loadAllSpots(userSpots));
        return userSpots;
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
    console.log('................. Spot', spot)
    let { url } = spot;
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const newSpot = await response.json();
        console.log("..........newSpot", newSpot)
        dispatch(addOneSpot(newSpot));
        const resImg = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url,
                preview: true
            })
        });

        if (resImg.ok) {
            const spotImage = await resImg.json();
            dispatch(addImg(newSpot, spotImage));
            return newSpot;
        };

    }
}

// Thunk action update a spot

export const editSpot = (spotId, spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    console.log("update spot222222222222" + response)
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
}

// Thunk action delete a spot
export const removeSpot = (spotId) => async dispatch => {
    console.log("deletecation____________,spotId", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const successMessage = await response.json();
        dispatch(deleteSpot(spotId));
        return successMessage;
    }
}

// spots reducer

const initialState = {
    allSpots: {},
    spot: {}
};

const spotsReducer = (state = initialState, action) => {
    let newState;
    let allSpots = {};
    switch (action.type) {
        case LOAD_SPOTS:
        // case USER_SPOTS:
            newState = { ...state };
            // let allSpots = {};
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            // console.log('ALL SPOTS REDUCED', allSpots)
            newState.allSpots = allSpots;
            newState.spot = {};
            return newState;

        case USER_SPOTS:
            newState = {};
            // let allSpots = {};
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            // console.log('ALL SPOTS REDUCED', allSpots)
            newState.allSpots = allSpots;
            // newState.spot = {};
            return newState;

        // console.log('newState++++++++++++++++++++++++ ', newState)

        case ONE_SPOT:
            newState = { ...state };
            newState.spot = action.spot
            console.log("XXXXXXXXXXXXXXXX NewState", newState)
            return newState;

        case ADD_IMG:
            newState = { ...state }
            newState.spot = action.payload.spot
            newState.spot.SpotImages = [action.payload.img]
            return newState;



        case ADD_SPOT:
            newState = { ...state };
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot };
            newState.spot = { ...state.spot, ...action.spot }
            // console.log("add spot action newState", newState)
            return newState;
        case UPDATE_SPOT:
            newState = { ...state };
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot }
            newState.spot = { ...state.spot, ...action.spot };
            // console.log("update spot newState 33333333333333:",action.spot)
            return newState;
        case DELETE_SPOT:
            newState = { ...state };
            // console.log("delete***************,spotId", spotId);
            // console.log("delete***************,action", action);
            // console.log("delete@@@@@@@@@@@@@@@@22",newState.allSpots)
            delete newState.allSpots[action.spotId]
            // console.log("delete***************,spotId", spotId)
            // console.log("delete***************,action", action)
            newState.spot = {};
            return newState;


        default:
            return state;
    }
}

export default spotsReducer;
