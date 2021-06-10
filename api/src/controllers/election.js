const { hasAnyRole } = require("../common/auth");
const electionService = require("../services/electionService");
const logger = require("../logging/logger");
const {
	StatusCodes: { OK },
} = require("http-status-codes");
const { roles } = require("../common/constants");
const { ER_FORBIDDEN } = require("../common/errors");

const getElectionStatus = async (req, res, next) => {
	logger.info(`ElectionController::getElectionStatus Received request to view election status`);
	try {
		const result = await electionService.getElectionStatus();
		res.status(OK).json(result);
	} catch (err) {
		next(err);
	}
};

const updateElectionStatus = async (req, res, next) => {
	const { admin } = req;
	logger.info(`ElectionController::updateElectionStatus Received request with the following body:${JSON.stringify(req.body)}`);
	try {
		if (hasAnyRole(admin, [roles.CEC])) {
			const result = await electionService.updateElectionStatus(req.body.electionStatus);
			res.status(OK).json(result);
		} else {
			throw ER_FORBIDDEN;
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getElectionStatus,
	updateElectionStatus,
};
