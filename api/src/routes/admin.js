const adminController = require("../controllers/admin");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post(
		"/api/v1/admin",
		middleware.electionStatusHandler.ensureElectionNotStarted,
		middleware.authenticationHandler,
		adminController.createAdmin
	);
	app.post("/api/v1/admin/login", middleware.electionStatusHandler.allowAnyElectionStatus, adminController.loginAdmin);

	app.get(
		"/api/v1/admin/:pollingBoothId",
		middleware.electionStatusHandler.allowAnyElectionStatus,
		adminController.getAdminByPollingBoothId
	);
};
