const {
	StatusCodes: { OK },
} = require("http-status-codes");

const getHealthStatus = async (req, res, next) => {
	try {
		res.status(OK).json({ health: "OK" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getHealthStatus,
};
