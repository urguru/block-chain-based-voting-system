import types from "./types";
import authClient from "../clients/authClient";

export const adminLogin = (email, password) => async (dispatch, getState) => {
    try {
        const response = await authClient.adminLogin(email, password);
        const data = response.data;
        console.log(data);
        dispatch({ type: types.ADMIN_LOG_IN, payload: { isLoggedIn: true, token: data.token, admin: data.admin, error: '' } });
        window.location.href = "/";
    } catch (e) {
        console.log(e.response.data);
        dispatch({ type: types.ADMIN_LOG_IN, payload: { isLoggedIn: false, error: e.response.data.message } })
    }
}

export const adminLogout = () => (dispatch, getState) => {
    dispatch({ type: types.ADMIN_LOG_OUT })
}