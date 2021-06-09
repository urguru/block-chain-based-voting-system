const citizenRoutes = require("./citizen");
const candidateRoutes = require("./candidate");
const constituencyRoutes = require("./constituency");
const pollingBoothRoutes = require("./pollingBooth");
const healthController = require("./health");
const adminController = require("./admin");

module.exports = (app) => {
	healthController(app);
	adminController(app);
	citizenRoutes(app);
	candidateRoutes(app);
	constituencyRoutes(app);
	pollingBoothRoutes(app);
};
