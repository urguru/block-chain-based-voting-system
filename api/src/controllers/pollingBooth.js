const logger = require("../logging/logger");
const { hasAnyRole } = require("../common/auth");
const { roles } = require("../common/constants");
const pollingBoothService = require("../services/pollingBoothService");
const {
	StatusCodes: { CREATED, OK },
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

const getPollingBoothByPollingBoothId = async (req, res, next) => {
	const { pollingBoothId } = req.params;
	logger.info(`PollingBoothController::getPollingBoothByPollingBoothId Received request with voterId:${pollingBoothId}`);
	try {
		const result = await pollingBoothService.getPollingBoothByPollingBoothId(pollingBoothId);
		res.status(OK).json(result);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createPollingBooth,
	getPollingBoothByPollingBoothId,
};
