const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/61b7f2721341453693448faf965b1597");

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
		.send({ gas: "3000000", gasPrice: "100", from: accounts[0] });

	console.log("Contract deployed to: ", result.options.address);
};
deploy();
