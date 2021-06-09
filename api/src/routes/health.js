const healthController = require("../controllers/health");

module.exports = (app) => {
    app.get('/api/health',healthController.getHealthStatus)
};
