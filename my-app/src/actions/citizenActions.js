import types from "./types";
import citizenClient from "../clients/citizenClient";

export const addCitizen = (citizen, props) => async (dispatch, getState) => {
    const ACCESS_TOKEN = getState().admin.token;
    const mainAccount = getState().contract.mainAccount;
    const contract = getState().contract.contract;
    try {
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding citizen to the blockchain network" } })
            await contract.methods.addCitizen(citizen.voterId, citizen.constituencyId).estimateGas({ from: mainAccount });
            await getState().contract.contract.methods.addCitizen(citizen.voterId, citizen.constituencyId).send({ from: mainAccount });
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added citizen to the blockchain network" } })
        } catch (e) {
            const errMessage = JSON.parse(e.message.substr(e.message.indexOf("{"))).originalError.message;
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: errMessage } })
            throw new Error();
        }
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding citizen to the database" } })
            await citizenClient.addCitizen(ACCESS_TOKEN, citizen);
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added citizen to the blockchain network and the database" } })
            props.history.push('/');
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        }
    } catch (e) {

    }
}

