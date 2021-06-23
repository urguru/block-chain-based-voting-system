import types from "./types";

export const toggleSidebar = () => (dispatch, getState) => {
    const sidebarOpen = getState().ui.sidebarOpen;
    dispatch({ type: types.TOGGLE_SIDE_BAR, payload: { sidebarOpen: !sidebarOpen } });
}

export const closeSidebar = () => (dispatch, getState) => {
    dispatch({ type: types.CLOSE_SIDE_BAR });
}

export const openSidebar = () => (dispatch, getState) => {
    dispatch({ type: types.OPEN_SIDE_BAR });
}

export const closeMainLoadingWindow = () => (dispatch, getState) => {
    dispatch({ type: types.SET_LOADING_WINDOW_CLOSE });
}