import types from "../actions/types";

const INITIAL_STATE = {
    isContractLoaded: false,
    contract: null,
    mainAccount: null,
    constituencies: null,
    candidates: null,
    pollingBooths: null,
    totalCitizens: null,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.LOAD_CONTRACT:
            return { ...state, isContractLoaded: true, ...action.payload }
        case types.LOAD_CONTRACT_FAILED:
            return { ...state, isContractLoaded: false }
        case types.LOAD_CONTRACT_DATA_FAILED:
            return {
                ...state, constituencies: null,
                candidates: null,
                pollingBooths: null,
                totalCitizens: null,
            }
        default:
            return state;
    };
}
