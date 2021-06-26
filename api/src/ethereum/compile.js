const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "election.sol");
const source = fs.readFileSync(contractPath, "utf-8");

var input = {
  language: "Solidity",
  sources: {
    "election.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const contracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath); //checks if exists; if doesn't, create one

for (let contract in contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(".sol", "") + ".json"),
    contracts[contract]
  );
}
