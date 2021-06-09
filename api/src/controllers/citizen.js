const { hasAnyRole } = require("../common/auth");
const citizenService = require("../services/citizenService");
const logger = require("../logging/logger");
const {
	StatusCodes: { OK, CREATED },
} = require("http-status-codes");
const { roles } = require("../common/constants");
const { ER_FORBIDDEN } = require("../common/errors");

const getCitizenByVoterId = async (req, res, next) => {
	const { voterId } = req.params;
	logger.info(`CitizenController::getCitizenByVoterId Received request with voterId:${voterId}`);
	try {
		if (hasAnyRole(req.admin, [roles.CEC, roles.PBO])) {
			const result = await citizenService.getCitizenByVoterId(voterId);
			res.status(OK).json(result);
		} else {
			throw ER_FORBIDDEN;
		}
	} catch (err) {
		next(err);
	}
};

const createCitizen = async (req, res, next) => {
	const { admin } = req;
	logger.info(`CitizenController::createCitizen Received request with the following body:${JSON.stringify(req.body)}`);
	try {
		if (hasAnyRole(admin, [roles.CEC, roles.PBO])) {
			const result = await citizenService.createCitizen(req.body);
			res.status(CREATED).json(result);
		} else {
			throw ER_FORBIDDEN;
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getCitizenByVoterId,
	createCitizen,
};
