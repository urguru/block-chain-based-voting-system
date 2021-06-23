import types from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: false,
    token: null,
    admin: null,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.ADMIN_LOG_IN:
            return {
                ...state, isLoggedIn: action.payload.isLoggedIn, token: action.payload.token,
                admin: action.payload.admin
            };
        case types.ADMIN_LOG_OUT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
};

