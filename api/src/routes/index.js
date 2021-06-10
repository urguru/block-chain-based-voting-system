const citizenRoutes = require("./citizen");
const candidateRoutes = require("./candidate");
const constituencyRoutes = require("./constituency");
const pollingBoothRoutes = require("./pollingBooth");
const healthRoutes = require("./health");
const adminRoutes = require("./admin");
const electionRoutes = require("./election");

module.exports = (app) => {
	healthRoutes(app);
	adminRoutes(app);
	citizenRoutes(app);
	candidateRoutes(app);
	constituencyRoutes(app);
	pollingBoothRoutes(app);
	electionRoutes(app);
};
