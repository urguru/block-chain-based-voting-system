const {
	StatusCodes: { INTERNAL_SERVER_ERROR },
} = require("http-status-codes");
const logger = require("../logging/logger");

const errorHandler = (error, req, res, next) => {
	if (error) {
		logger.error(`Got Error in errorHandler: ${JSON.stringify(error)}`);
		if (error.statusCode) {
			const { name, message, details, statusCode } = error;
			res.status(statusCode).json({ name, message, details });
		} else {
			res.status(INTERNAL_SERVER_ERROR).json({
				name: "INTERNAL_SERVER_ERROR",
				message: "There was some internal server error",
			});
			//TODO: This error is being thrown just for debugging
			throw error;
		}
	}
	next();
};

module.exports = errorHandler;
