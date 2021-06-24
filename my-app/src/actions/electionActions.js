import types from "./types";
import electionClient from "../clients/electionClient";
import constants from "../common/constants";

export const updateElectionStatus = (electionStatus, props) => async (dispatch, getState) => {
    const ACCESS_TOKEN = getState().admin.token;
    const mainAccount = getState().contract.mainAccount;
    const contract = getState().contract.contract;
    try {
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Updating election state on the block chain" } })
            if (electionStatus == constants.electionStatus.STARTED.text) {
                await contract.methods.startElection().estimateGas({ from: mainAccount });
                await contract.methods.startElection().send({ from: mainAccount });
            } else if (electionStatus == constants.electionStatus.COMPLETED.text) {
                await contract.methods.endElection().estimateGas({ from: mainAccount });
                await contract.methods.endElection().send({ from: mainAccount });
            } else {
                return;
            }
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully updated the election state on  the blockchain network" } })
        } catch (e) {
            const errMessage = JSON.parse(e.message.substr(e.message.indexOf("{"))).originalError.message;
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: errMessage } })
            throw new Error();
        }
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Updating election state on the database" } })
            await electionClient.updateElectionStatus(ACCESS_TOKEN, electionStatus);
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added candidate to the blockchain network and the database" } })
            props.history.push('/');
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        }
    } catch (e) {

    }
}

