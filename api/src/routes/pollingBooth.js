const pollingBoothController = require("../controllers/pollingBooth");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post("/api/v1/pollingBooth", middleware.authenticationHandler, pollingBoothController.createPollingBooth);
};
