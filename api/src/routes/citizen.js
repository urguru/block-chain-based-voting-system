const citizenController = require("../controllers/citizen");
const middleware = require("../middleware");

module.exports = (app) => {
	app.get("/api/v1/citizen/:voterId", middleware.authenticationHandler, citizenController.getCitizenByVoterId);
	app.post("/api/v1/citizen", middleware.authenticationHandler, citizenController.createCitizen);
};
