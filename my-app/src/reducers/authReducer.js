import types from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: false,
    token: null,
    admin: null,
    error: '',
};

export default (state = { ...INITIAL_STATE }, action) => {
    console.log(INITIAL_STATE);
    switch (action.type) {
        case types.ADMIN_LOG_IN:
            return {
                ...state, isLoggedIn: action.payload.isLoggedIn, token: action.payload.token,
                admin: action.payload.admin, error: action.payload.error
            };
        case types.ADMIN_LOG_OUT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
};

