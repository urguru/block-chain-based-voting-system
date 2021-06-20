import types from "../actions/types";

const INITIAL_STATE = {
    sidebarOpen: false,
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.TOGGLE_SIDE_BAR:
            return { ...state, sidebarOpen: action.payload.sidebarOpen };
        default:
            return state;
    }
};

