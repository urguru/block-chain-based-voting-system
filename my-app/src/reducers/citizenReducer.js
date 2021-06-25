import types from "../actions/types";

const INITIAL_STATE = {
    isDataLoaded: false,
    citizen: null
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.START_LOADING_CITIZEN_DATA:
            return {
                ...state, isDataLoaded: false, citizen: null,
            };
        case types.FAIL_LOADING_CITIZEN_DATA:
            return {
                ...state, isDataLoaded: false, citizen: null,
            };
        case types.COMPLETE_LOADING_CITIZEN_DATA:
            return {
                ...state, isDataLoaded: true, citizen: action.payload.citizen
            }
        default:
            return state;
    }
};

