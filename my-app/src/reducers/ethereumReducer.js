import types from "../actions/types";

const INITIAL_STATE = {
    isConnectedToNetwork: false,
    isContractLoaded: false,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.CONNECT_TO_NETWORK:
            return {
                ...state, isConnectedToNetwork: true
            };
        case types.CONNECT_TO_NETWORK_FAILED:
            return { ...state, ...INITIAL_STATE }
        case types.LOAD_CONTRACT:
            return { ...state, isContractLoaded: true }
        case types.LOAD_CONTRACT_FAILED:
            return { ...state, isContractLoaded: false }
        default:
            return state;
    }
};

