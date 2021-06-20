import web3 from "./getWeb3";
import electionFile from "../ethereum/build/election.json";

console.log(web3)
const electionInterface = electionFile.Election.abi;

export default (address) => {
	return new web3.eth.Contract(electionInterface, address);
};
