const electionController = require("../controllers/election");
const middleware = require("../middleware");

module.exports = (app) => {
	app.get("/api/v1/election", middleware.electionStatusHandler.allowAnyElectionStatus, electionController.getElectionStatus);
	app.put(
		"/api/v1/election",
		middleware.electionStatusHandler.allowAnyElectionStatus,
		middleware.authenticationHandler,
		electionController.updateElectionStatus
	);
};
