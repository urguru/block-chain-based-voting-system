import types from "./types";
import candidateClient from "../clients/candidateClient";

export const addCandidate = (candidate, props) => async (dispatch, getState) => {
    const ACCESS_TOKEN = getState().admin.token;
    const mainAccount = getState().contract.mainAccount;
    const contract = getState().contract.contract;
    try {
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding candidate to the blockchain network" } })
            await contract.methods.addCandidate(candidate.voterId, candidate.contestingConstituencyId).estimateGas({ from: mainAccount });
            await getState().contract.contract.methods.addCandidate(candidate.voterId, candidate.contestingConstituencyId).send({ from: mainAccount });
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added candidate to the blockchain network" } })
        } catch (e) {
            const errMessage = JSON.parse(e.message.substr(e.message.indexOf("{"))).originalError.message;
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: errMessage } })
            throw new Error();
        }
        try {
            dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Adding candidate to the database" } })
            await candidateClient.addCandidate(ACCESS_TOKEN, candidate);
            dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Successfully added candidate to the blockchain network and the database" } })
            props.history.push('/');
        } catch (e) {
            dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        }
    } catch (e) {

    }
}

export const getCandidateByVoterId = (candidateVoterId, props) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.START_LOADING_CANDIDATE_DATA })
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Fetching Candidate Details from the database" } })
        console.log(candidateVoterId)
        const response = await candidateClient.getCandidateByVoterId(candidateVoterId);
        dispatch({ type: types.COMPLETE_LOADING_CANDIDATE_DATA, payload: { candidate: response.data } })
        dispatch({ type: types.SET_LOADING_WINDOW_CLOSE })
    } catch (e) {
        dispatch({ type: types.SET_LOADING_WINDOW_FAILURE, payload: { mainLoadingWindowMessage: e.response.data.message } })
        dispatch({ type: types.FAIL_LOADING_CANDIDATE_DATA })
        props.history.push('/');
    }
}


