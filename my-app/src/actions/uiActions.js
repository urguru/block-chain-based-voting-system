import types from "./types";

export const toggleSidebar = () => (dispatch, getState) => {
    const sidebarOpen = getState().ui.sidebarOpen;
    dispatch({ type: types.TOGGLE_SIDE_BAR, payload: { sidebarOpen: !sidebarOpen } });
}