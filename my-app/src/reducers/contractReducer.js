import types from "../actions/types";

const INITIAL_STATE = {
    isContractLoaded: false,
    contract: null,
    mainAccount: null,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.LOAD_CONTRACT:
            return { ...state, isContractLoaded: true, contract: action.payload.contract, mainAccount: action.payload.mainAccount }
        case types.LOAD_CONTRACT_FAILED:
            return { ...state, isContractLoaded: false }
        default:
            return state;
    }
};

