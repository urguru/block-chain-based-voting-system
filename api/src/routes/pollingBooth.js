const pollingBoothController = require("../controllers/pollingBooth");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post(
		"/api/v1/pollingBooth",
		middleware.electionStatusHandler.ensureElectionNotStarted,
		middleware.authenticationHandler,
		pollingBoothController.createPollingBooth
	);

	app.get(
		"/api/v1/pollingBooth/:pollingBoothId",
		middleware.electionStatusHandler.allowAnyElectionStatus,
		pollingBoothController.getPollingBoothByPollingBoothId
	);
};
