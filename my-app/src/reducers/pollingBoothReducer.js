import types from "../actions/types";

const INITIAL_STATE = {
    isDataLoaded: false,
    pollingBooth: null
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.START_LOADING_POLLINGBOOTH_DATA:
            return {
                ...state, isDataLoaded: false, pollingBooth: null,
            };
        case types.FAIL_LOADING_POLLINGBOOTH_DATA:
            return {
                ...state, isDataLoaded: false, pollingBooth: null,
            };
        case types.COMPLETE_LOADING_POLLINGBOOTH_DATA:
            return {
                ...state, isDataLoaded: true, pollingBooth: action.payload.pollingBooth
            }
        default:
            return state;
    }
};

