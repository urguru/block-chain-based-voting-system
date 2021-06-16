import Election from "./clients/electionContract";

function App() {
	const election = Election("0xb17763742f3c330359ad530a6231d03febda99c4");
	const x = election.methods.electionStatus();
	console.log(x);
	return <div>Hello World</div>;
}

export default App;
