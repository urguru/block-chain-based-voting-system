require("dotenv").config({ path: __dirname + "/.env" });
require("./src/db/mongoose");
const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./src/routes");
const middleware = require("./src/middleware");
const logger = require("./src/logging/logger");
const httpLogger = require("./src/logging/httpLogger");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

routes(app);
app.use(middleware.errorHandler);

app.listen(port, () => {
	logger.info(`Server started listening on the port:${port}`);
});
