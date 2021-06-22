import types from "./types";
import electionFile from "../ethereum/build/election.json";
import config from "../config";
import Web3 from '../clients/web3Client';

export const loadContract = () => async (dispatch, getState) => {
    try {
        const web3 = await Web3();
        const availableAccounts = await web3.eth.getAccounts();
        const mainAccount = availableAccounts[0].toLowerCase();
        const address = config.contractAddress;
        const electionInterface = electionFile.Election.abi;
        const contract = new web3.eth.Contract(electionInterface, address);
        dispatch({ type: types.LOAD_CONTRACT, payload: { contract, mainAccount } })
    } catch (e) {
        dispatch({ type: types.LOAD_CONTRACT_FAILED });
    }
}

