import types from "./types";
import constituencyClient from "../clients/constituencyClient";

export const addConstituency = (constituency, props) => async (dispatch, getState) => {
    const ACCESS_TOKEN = getState().admin.token;
    const mainAccount = getState().contract.mainAccount;
    const contract = getState().contract.contract;
    try {
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding constituency on blockchain network" } })
            await contract.methods.addConstituency(constituency.constituencyId).estimateGas({ from: mainAccount });
            await getState().contract.contract.methods.addConstituency(constituency.constituencyId).send({ from: mainAccount });
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added constituency to blockchain network" } })
        } catch (e) {
            const errMessage = JSON.parse(e.message.substr(e.message.indexOf("{"))).originalError.message;
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: errMessage } })
            throw new Error();
        }
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding constituency to database" } })
            await constituencyClient.addConstituency(ACCESS_TOKEN, constituency);
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added constituency to blockchain network and database" } })
            props.history.push('/');
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        }
    } catch (e) {

    }
}

export const getConstituencyById = (constituencyId, props) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.START_LOADING_CONSTITUENCY_DATA })
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Fetching Constituency from the database" } })
        const response = await constituencyClient.getConstituencyById(constituencyId);
        dispatch({ type: types.COMPLETE_LOADING_CONSTITUENCY_DATA, payload: { constituency: response.data } })
        dispatch({ type: types.SET_LOADING_WINDOW_CLOSE })
    } catch (e) {
        dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        dispatch({ type: types.FAIL_LOADING_CONSTITUENCY_DATA })
        props.history.push('/');
    }
}

