const logger = require("../logging/logger");
const { hasAnyRole } = require("../common/auth");
const { roles } = require("../common/constants");
const constituencyService = require("../services/constituencyService");
const {
	StatusCodes: { CREATED, OK },
} = require("http-status-codes");
const { ER_FORBIDDEN } = require("../common/errors");

const createConstituency = async (req, res, next) => {
	const { admin } = req;
	logger.info(`ConstituencyController::createConstituency Received request with body ${JSON.stringify(req.body)}`);
	try {
		if (hasAnyRole(admin, [roles.CEC])) {
			const result = await constituencyService.createConstituency(req.body);
			res.status(CREATED).json(result);
		} else {
			next(ER_FORBIDDEN);
		}
	} catch (err) {
		next(err);
	}
};

const getConstituencyByConstituencyId = async (req, res, next) => {
	const {
		electionStatus,
		params: { constituencyId },
	} = req;
	logger.info(`ConstituencyController::getConstituencyByConstituencyId Received request with constituencyId: ${constituencyId}`);
	try {
		const result = await constituencyService.getConstituencyByConstituencyId(constituencyId, electionStatus);
		res.status(OK).json(result);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createConstituency,
	getConstituencyByConstituencyId,
};
