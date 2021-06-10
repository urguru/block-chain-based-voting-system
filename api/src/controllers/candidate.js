const candidateService = require("../services/candidateService");
const logger = require("../logging/logger");
const { roles } = require("../common/constants");
const { hasAnyRole } = require("../common/auth");
const { ER_FORBIDDEN } = require("../common/errors");
const {
	StatusCodes: { OK, CREATED },
} = require("http-status-codes");

const createCandidate = async (req, res, next) => {
	const { admin } = req;
	logger.info(`CandidateController::createCandidate Received request with the following body:${JSON.stringify(req.body)}`);
	try {
		if (hasAnyRole(admin, [roles.CEC])) {
			const result = await candidateService.createCandidate(req.body);
			res.status(CREATED).json(result);
		} else {
			throw ER_FORBIDDEN;
		}
	} catch (err) {
		next(err);
	}
};

const getCandidateByVoterId = async (req, res, next) => {
	const { voterId, electionStatus } = req.params;
	logger.info(`CandidateController::getCandidateByVoterId Received request with voterId:${voterId}`);
	try {
		const result = await candidateService.getCandidateByVoterId(voterId, electionStatus);
		res.status(OK).json(result);
	} catch (err) {
		next(err);
	}
};

module.exports = {
    createCandidate,
    getCandidateByVoterId
};
