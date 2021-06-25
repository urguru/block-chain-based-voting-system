import types from "../actions/types";

const INITIAL_STATE = {
    isDataLoaded: false,
    candidate: null
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.START_LOADING_CANDIDATE_DATA:
            return {
                ...state, isDataLoaded: false, candidate: null,
            };
        case types.FAIL_LOADING_CANDIDATE_DATA:
            return {
                ...state, isDataLoaded: false, candidate: null,
            };
        case types.COMPLETE_LOADING_CANDIDATE_DATA:
            return {
                ...state, isDataLoaded: true, candidate: action.payload.candidate
            }
        default:
            return state;
    }
};

