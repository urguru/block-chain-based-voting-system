import types from "../actions/types";

const INITIAL_STATE = {
    isContractNeedsReload: true,
    isContractLoaded: false,
    contract: null,
    mainAccount: null,
    constituencies: [],
    candidates: [],
    pollingBooths: [],
    totalCitizens: null,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.LOAD_CONTRACT:
            return { ...state, isContractNeedsReload: true, isContractLoaded: true, ...action.payload, }
        case types.LOAD_CONTRACT_FAILED:
            return { ...state, isContractNeedsReload: true, isContractLoaded: false }
        case types.LOAD_CONTRACT_DATA_FAILED:
            return {
                ...state,
                isContractNeedsReload: true,
                constituencies: null,
                candidates: null,
                pollingBooths: null,
                totalCitizens: null,
            }
        case types.CONTRACT_DOESNOT_NEED_RELOAD:
            return { ...state, isContractNeedsReload: false }
        default:
            return state;
    };
}
