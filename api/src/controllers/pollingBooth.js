const logger = require("../logging/logger");
const { hasAnyRole } = require("../common/auth");
const { roles } = require("../common/constants");
const pollingBoothService = require("../services/pollingBoothService");
const {
	StatusCodes: { CREATED },
} = require("http-status-codes");
const { ER_FORBIDDEN } = require("../common/errors");

const createPollingBooth = async (req, res, next) => {
	const { admin } = req;
	logger.info(`PollingBoothController::createPollingBooth Received request with body ${JSON.stringify(req.body)}`);
	try {
		if (hasAnyRole(admin, [roles.CEC])) {
			const result = await pollingBoothService.createPollingBooth(req.body);
			res.status(CREATED).json(result);
		} else {
			next(ER_FORBIDDEN);
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createPollingBooth,
};
