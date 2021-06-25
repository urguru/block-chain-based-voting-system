import types from "./types";
import electionFile from "../ethereum/build/election.json";
import config from "../config";
import Web3 from '../clients/web3Client';

export const loadContract = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Connecting to Metamask" } })
        const web3 = await Web3();
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Fetching available accounts" } })
        const availableAccounts = await web3.eth.getAccounts();
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Loading Contract" } })
        const mainAccount = availableAccounts[0].toLowerCase();
        const address = config.contractAddress;
        const electionInterface = electionFile.Election.abi;
        const contract = new web3.eth.Contract(electionInterface, address);
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Loading contract data" } })
        const [electionStatus, constituencies, candidates, pollingBooths, totalCitizens] = await Promise.all([
            contract.methods.getElectionStatus().call(),
            contract.methods.getAllConstituencies().call(),
            contract.methods.getAllCandidates().call(),
            contract.methods.getAllPollingBooths().call(),
            contract.methods.getCountOfCitizens().call()]);
        let voteCountArray=[];
        if (electionStatus == 2) {
            voteCountArray = await contract.methods.getAllVotes().call();
        }
        console.log(electionStatus, constituencies, candidates, pollingBooths, totalCitizens);
        if (electionStatus == 0) {
            dispatch({ type: types.SET_ELECTION_STATUS_NOT_STARTED })
        } else if (electionStatus == 1) {
            dispatch({ type: types.SET_ELECTION_STATUS_STARTED })
        } else if (electionStatus == 2) {
            dispatch({ type: types.SET_ELECTION_STATUS_COMPLETED })
        }
        dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Connected to the network" } })
        dispatch({ type: types.LOAD_CONTRACT, payload: { contract, mainAccount, electionStatus, constituencies, candidates, pollingBooths, totalCitizens,voteCountArray } })
    } catch (e) {
        dispatch({ type: types.LOAD_CONTRACT_FAILED });
    }
}

export const loadContractData = () => async (dispatch, getState) => {
    try {
        const contract = getState().contract.contract;
        const mainAccount = getState().contract.mainAccount;
        dispatch({ type: types.SET_LOADING_WINDOW_LOADING, payload: { mainLoadingWindowMessage: "Loading contract data" } })
        const [electionStatus, constituencies, candidates, pollingBooths, totalCitizens] = await Promise.all([
            contract.methods.getElectionStatus().call(),
            contract.methods.getAllConstituencies().call(),
            contract.methods.getAllCandidates().call(),
            contract.methods.getAllPollingBooths().call(),
            contract.methods.getCountOfCitizens().call()]);
        console.log(electionStatus, constituencies, candidates, pollingBooths, totalCitizens);
        if (electionStatus == 0) {
            dispatch({ type: types.SET_ELECTION_STATUS_NOT_STARTED })
        } else if (electionStatus == 1) {
            dispatch({ type: types.SET_ELECTION_STATUS_STARTED })
        } else if (electionStatus == 2) {
            dispatch({ type: types.SET_ELECTION_STATUS_COMPLETED })
        }
        dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Completed loading the contract data" } })
        dispatch({ type: types.LOAD_CONTRACT, payload: { contract, mainAccount, electionStatus, constituencies, candidates, pollingBooths, totalCitizens } })
    } catch (e) {
        dispatch({ type: types.SET_LOADING_WINDOW_SUCCESS, payload: { mainLoadingWindowMessage: "Error Loading the contract data" } })
        dispatch({ type: types.LOAD_CONTRACT_DATA_FAILED });
    }
}

export const contractNeedsReload = () => (dispatch, getState) => {
    dispatch({ type: types.CONTRACT_NEEDS_RELOAD });
}
