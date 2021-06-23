import types from "../actions/types";
import constants from "../common/constants";

const INITIAL_STATE = {
    sidebarOpen: false,
    mainLoadingWindowState: constants.mainLoadingWindowStates.CLOSED,
    mainLoadingWindowMessage: '',
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.OPEN_SIDE_BAR:
            return { ...state, sidebarOpen: true };
        case types.CLOSE_SIDE_BAR:
            return { ...state, sidebarOpen: false };
        case types.SET_LOADING_WINDOW_CLOSE:
            return { ...state, mainLoadingWindowState: constants.mainLoadingWindowStates.CLOSED }
        case types.SET_LOADING_WINDOW_FAILURE:
            return {
                ...state, mainLoadingWindowState: constants.mainLoadingWindowStates.FAILURE,
                mainLoadingWindowMessage: action.payload.mainLoadingWindowMessage
            }
        case types.SET_LOADING_WINDOW_LOADING:
            return {
                ...state, mainLoadingWindowState: constants.mainLoadingWindowStates.LOADING,
                mainLoadingWindowMessage: action.payload.mainLoadingWindowMessage
            }
        case types.SET_LOADING_WINDOW_SUCCESS:
            return {
                ...state, mainLoadingWindowState: constants.mainLoadingWindowStates.SUCCESS,
                mainLoadingWindowMessage: action.payload.mainLoadingWindowMessage
            }
        default:
            return state;
    }
};

