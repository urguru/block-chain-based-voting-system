const candidateController = require("../controllers/candidate");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post("/api/v1/candidate",middleware.authenticationHandler,candidateController.createCandidate);
};
