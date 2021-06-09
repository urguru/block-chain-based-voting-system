import web3 from "./web3";

const electionJSONFilePath = path.resolve(__dirname, "build", "election.json");
const election = JSON.parse(fs.readFileSync(electionJSONFilePath));
const electionInterface = election.Election.abi;

export default (address) => {
  return new web3.eth.Contract(electionInterface, address);
};
