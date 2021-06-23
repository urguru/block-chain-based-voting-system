import types from "./types";
import citizenClient from "../clients/citizenClient";

export const addCitizen = (citizen, props) => async (dispatch, getState) => {
    const ACCESS_TOKEN = getState().auth.token;
    const mainAccount = getState().contract.mainAccount;
    try {
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding citizen on blockchain network" } })
            await getState().contract.contract.methods.addCitizen(citizen.voterId, citizen.constituencyId).send({ from: mainAccount });
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added citizen to blockchain network" } })
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: "There was some error" } })
            console.log(e);
            throw new Error();
        }
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding citizen to database" } })
            await citizenClient.addCitizen(ACCESS_TOKEN, citizen);
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added citizen to blockchain network and database" } })
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        }
    } catch (e) {

    }
}
