import { csrfFetch } from "./csrf";
//  action type
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const ONE_SPOT = "spots/ONE_SPOT";
const ADD_SPOT = "spots/ADD_SPOT"


//action creators
const loadAllSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const loadOneSpot = (spot) => ({
    type: ONE_SPOT,
    spot
})

const addOneSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

//Thunk action get all spots
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAllSpots(spots));
    }
}

//Thunk action get spots by id

export const getOneSpot = (spotId) => async (dispatch) => {
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

// export const getUserSpots = () => async (dispatch)=> {
//     const response = await csrfFetch(`/api/spots/current`);

//     if (response.ok) {
//         const userSpots = await response.json();
//         dispatch(loadAllSpots(userSpots));
//     }
// }


// Thunk action add a spot
export const addSpot = (spot)=> async (dispatch) => {
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

const initialState = {
    allSpots: {},
    spot: {}
};

const spotsReducer = (state = initialState, action) => {
    let newState ;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            const allSpots = {};
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            // console.log('newState++++++++++++++++++++++++ ', newState)
            newState.allSpots = allSpots
            return newState;
        case ONE_SPOT:
            newState = { ...state };
            const spot = {...action.spot};
            newState.spot= spot
            //  console.log("%%%%%%%%%%%%%%%%%%%%%%%",action.spot)
            return newState;
        // case ADD_SPOT:
        //     newState = { ...state };
        //     const newSpots = { ...action.spot };
        //     newSpots.allSpots[action.spot.id]

        default:
            return state;
    }
}

export default spotsReducer;
