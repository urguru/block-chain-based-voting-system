import web3 from "./getWeb3";

const electionJSONFilePath = path.resolve(__dirname, "..", "..", "api", "ethereum", "build", "election.json");
const election = JSON.parse(fs.readFileSync(electionJSONFilePath));
const electionInterface = election.Election.abi;

export default (address) => {
	return new web3.eth.Contract(electionInterface, address);
};
