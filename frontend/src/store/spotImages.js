import { csrfFetch } from './csrf';

const CREATE_SPOT_IMAGE = 'spotImgs/createSpotImg';
const DELETE_SPOT_IMAGE = 'spotImgs/deleteSpotImg';


const createSpotImageAction = (spotImg) => {
    return {
        type: CREATE_SPOT_IMAGE,
        spotImg,
    }
}

const deleteSpotImageAction = (imgId) => {
    return {
        type: DELETE_SPOT_IMAGE,
        imgId
    }
}


// thunk: create product img
export const createSpotImageThunk = (spotImg, spotId) => async (dispatch) => {
    try {
        const { url } = spotImg;
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    url,
                }
            )
        })
        if (response.ok) {
            const data = await response.json();
            await dispatch(createSpotImageAction(data));
            return data;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// thunk: delete product img
export const deleteSpotImageThunk = (imgId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spot-images/${imgId}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            dispatch(deleteSpotImageAction(imgId));
            return response;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}



//todo: reducer stuff --------------------------------------------------------
const initialState = { SpotAllImgs: {}, SpotOneImg: {} };

const spotImgsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {

        case CREATE_SPOT_IMAGE:
            newState = { ...state, SpotAllImgs: { ...state.SpotAllImgs }, SpotOneImg: {} };
            const newSpotImg = { ...action.spotimg };
            newState.SpotAllImgs[action.spotImg.id] = newSpotImg;
            newState.SpotOneimg = newSpotImg;
            return newState;

        case DELETE_SPOT_IMAGE:
            newState = { SpotAllImgs: { ...state.SpotAllImgs }, SpotOneImg: { ...state.SpotOneImg } };
            delete newState.SpotAllImgs[action.ImgId];
            if (action.imgId === newState.SpotOneImg.id) { newState.SpotOneImg = {} }
            return newState;

        default:
            return state;
    }
}

export default spotImgsReducer;
