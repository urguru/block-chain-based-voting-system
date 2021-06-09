const adminController = require("../controllers/admin");
const middleware = require("../middleware");

module.exports = (app) => {
	app.post("/api/v1/admin", middleware.authenticationHandler, adminController.createAdmin);
	app.post("/api/v1/admin/login", adminController.loginAdmin);
};
