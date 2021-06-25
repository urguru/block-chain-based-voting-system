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

export const getPollingBoothById = (pollingBoothId, props) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.START_LOADING_POLLINGBOOTH_DATA })
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Fetching Candidate Details from the database" } })
        const response = await pollingBoothClient.getPollingBoothById(pollingBoothId);
        dispatch({ type: types.COMPLETE_LOADING_POLLINGBOOTH_DATA, payload: { pollingBooth: response.data } })
        dispatch({ type: types.SET_LOADING_WINDOW_CLOSE })
    } catch (e) {
        dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        dispatch({ type: types.FAIL_LOADING_POLLINGBOOTH_DATA })
        props.history.push('/');
    }
}
