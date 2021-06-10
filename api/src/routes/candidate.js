const candidateController = require("../controllers/candidate");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post(
		"/api/v1/candidate",
		middleware.electionStatusHandler.ensureElectionNotStarted,
		middleware.authenticationHandler,
		candidateController.createCandidate
	);

	app.get(
		"/api/v1/candidate/:voterId",
		middleware.electionStatusHandler.allowAnyElectionStatus,
		candidateController.getCandidateByVoterId
	);
};
