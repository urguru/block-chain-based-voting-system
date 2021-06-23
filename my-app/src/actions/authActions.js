import types from "./types";
import authClient from "../clients/adminClient";

export const adminLogin = (email, password, props) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Logging in to the application" } })
        const response = await authClient.adminLogin(email, password);
        dispatch({ type: types.ADMIN_LOG_IN, payload: { isLoggedIn: true, token: response.data.token, admin: response.data.admin } });
        dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully logged into the application" } })
        props.history.push('/');
    } catch (e) {
        dispatch({ type: types.ADMIN_LOG_IN, payload: { isLoggedIn: false } })
        dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
    }
}

export const adminLogout = (props) => (dispatch, getState) => {
    console.log(props);
    dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Logging out of the application" } })
    dispatch({ type: types.ADMIN_LOG_OUT })
    dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully logged out of the application" } })
    props.history.push('/');
}