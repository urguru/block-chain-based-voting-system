const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/61b7f2721341453693448faf965b1597");

//Deploying on localhost
const web3 = new Web3("http://localhost:8545");

const electionJSONFilePath = path.resolve(__dirname, "build", "election.json");
const election = JSON.parse(fs.readFileSync(electionJSONFilePath));
const electionInterface = election.Election.abi;
const electionBytecode = election.Election.evm.bytecode.object;

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("Attemping to deploy from account", accounts[0]);
	const result = await new web3.eth.Contract(electionInterface)
		.deploy({ data: electionBytecode })
		.send({
			from: accounts[0], gas: 4712388,
			gasPrice: 100000000000
		});

	console.log("Contract deployed to: ", result.options.address);
	return result;
};

deploy().then(res => {
	console.log("Successfully deployed the contract",);
	process.exit();
}).catch(err => {
	console.log("Error Deploying the contract");
});
