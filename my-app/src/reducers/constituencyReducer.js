import types from "../actions/types";

const INITIAL_STATE = {
    isDataLoaded: false,
    constituency: null,
    contractConstituency: null,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.START_LOADING_CONSTITUENCY_DATA:
            return {
                ...state, isDataLoaded: false, constituency: null, contractConstituency: null,
            };
        case types.FAIL_LOADING_CONSTITUENCY_DATA:
            return {
                ...state, isDataLoaded: false, constituency: null, contractConstituency: null,
            };
        case types.COMPLETE_LOADING_CONSTITUENCY_DATA:
            return {
                ...state, isDataLoaded: true, constituency: action.payload.constituency,
                contractConstituency: action.payload.contractConstituency
            }
        default:
            return state;
    }
};

