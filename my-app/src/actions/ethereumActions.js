import types from "./types";
import web3Client from "../clients/web3Client";
import electionFile from "../ethereum/build/election.json";
import config from "../config";

let web3 = null;;
let contract = null;
const address = config.contractAddress;
const electionInterface = electionFile.Election.abi;

export const loadContract = () => async (dispatch, getState) => {
    try {
        web3 = await web3Client();
        contract = new web3.eth.Contract(electionInterface, address);
        dispatch({ type: types.LOAD_CONTRACT })
    } catch (e) {
        dispatch({ type: types.LOAD_CONTRACT_FAILED });
    }
}

export const addCitizenContract = (voterId, constituencyId) => async (dispatch, getState) => {
    try {
        console.log(electionInterface);
        console.log("Hello world");
        console.log(voterId)
        console.log(contract);
        contract = new web3.eth.Contract(electionInterface, address);
        console.log(contract);
        const acc = await web3.eth.getAccounts()[0];
        const y = await contract.methods.getAllConstituencies().call();
        console.log(y);
        console.log("basbbas" + acc);
        const x = await contract.methods.addCitizen(voterId, constituencyId).call({ from: acc });
    } catch (e) {
        console.log(e)
    }
}

