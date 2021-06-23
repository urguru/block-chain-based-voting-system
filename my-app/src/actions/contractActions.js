import types from "./types";
import electionFile from "../ethereum/build/election.json";
import config from "../config";
import Web3 from '../clients/web3Client';

export const loadContract = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Connecting to Metamask" } })
        const web3 = await Web3();
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Fetching available accounts" }})
        const availableAccounts = await web3.eth.getAccounts();
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Loading Contract" }})
        const mainAccount = availableAccounts[0].toLowerCase();
        const address = config.contractAddress;
        const electionInterface = electionFile.Election.abi;
        const contract = new web3.eth.Contract(electionInterface, address);
        dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Connected to the network" }})
        dispatch({ type: types.LOAD_CONTRACT, payload: { contract, mainAccount } })
    } catch (e) {
        dispatch({ type: types.LOAD_CONTRACT_FAILED });
    }
}

