const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

const provider = "http://localhost:8545";

const web3 = new Web3(provider);

const electionJSONFilePath = path.resolve(__dirname, "build", "election.json");
const election = JSON.parse(fs.readFileSync(electionJSONFilePath));
const electionInterface = election.Election.abi;
const electionBytecode = election.Election.evm.bytecode.object;

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attemping to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(electionInterface)
    .deploy({ data: electionBytecode })
    .send({ gas: "300000000000000", gasPrice: "1", from: accounts[0] });

  console.log("Contract deployed to: ", result.options.address);
};
deploy();
