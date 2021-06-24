import types from "./types";
import pollingBoothClient from "../clients/pollingBoothClient";
import { isAddress } from "web3-utils";

export const addPollingBooth = (pollingBooth, props) => async (dispatch, getState) => {
    if (!isAddress(pollingBooth.pollingBoothId)) {
        dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: "Invalid Polling Booth Id" } });
        return;
    }

    const ACCESS_TOKEN = getState().admin.token;
    const mainAccount = getState().contract.mainAccount;
    const contract = getState().contract.contract;
    try {
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding polling booth on the blockchain network" } })
            await contract.methods.whitelistPollingBooth(pollingBooth.pollingBoothId).estimateGas({ from: mainAccount });
            await contract.methods.whitelistPollingBooth(pollingBooth.pollingBoothId).send({ from: mainAccount });
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added polling booth to the blockchain network" } })
        } catch (e) {
            const errMessage = JSON.parse(e.message.substr(e.message.indexOf("{"))).originalError.message;
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: errMessage } })
            throw new Error();
        }
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding polling booth to the database" } })
            await pollingBoothClient.addPollingBooth(ACCESS_TOKEN, pollingBooth);
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added polling booth to the blockchain network and the database" } })
            props.history.push('/');
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        }
    } catch (e) {

    }
}

