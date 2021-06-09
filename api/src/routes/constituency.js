const constituencyController = require("../controllers/constituency");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post("/api/v1/constituency", middleware.authenticationHandler, constituencyController.createConstituency);
};
