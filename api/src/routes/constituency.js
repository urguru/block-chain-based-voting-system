const constituencyController = require("../controllers/constituency");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post(
		"/api/v1/constituency",
		middleware.electionStatusHandler.ensureElectionNotStarted,
		middleware.authenticationHandler,
		constituencyController.createConstituency
	);

	app.get(
		"/api/v1/constituency/:constituencyId",
		middleware.electionStatusHandler.allowAnyElectionStatus,
		constituencyController.getConstituencyByConstituencyId
	);
};
