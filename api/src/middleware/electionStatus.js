const electionRepository = require("../repositories/electionRepository");
const { electionStatus } = require("../common/constants");
const {
	ER_ELECTION_NOT_IN_STARTED_STATE,
	ER_ELECTION_NOT_IN_NOT_STARTED_STATE,
	ER_ELECTION_NOT_IN_COMPLETED_STATE,
} = require("../common/errors");

const ensureElectionStarted = async (req, res, next) => {
	try {
		const election = await electionRepository.getElectionStatus();
		req.electionStatus = election.electionStatus;
		if (election.electionStatus != electionStatus.STARTED) {
			next(ER_ELECTION_NOT_IN_STARTED_STATE);
		}
		next();
	} catch (err) {
		next(err);
	}
};

const ensureElectionNotStarted = async (req, res, next) => {
	try {
		const election = await electionRepository.getElectionStatus();
		req.electionStatus = election.electionStatus;
		if (election.electionStatus != electionStatus.NOT_STARTED) {
			next(ER_ELECTION_NOT_IN_NOT_STARTED_STATE);
		}
		next();
	} catch (err) {
		next(err);
	}
};

const ensureElectionCompleted = async (req, res, next) => {
	try {
		const election = await electionRepository.getElectionStatus();
		req.electionStatus = election.electionStatus;
		if (election.electionStatus != electionStatus.COMPLETED) {
			next(ER_ELECTION_NOT_IN_COMPLETED_STATE);
		}
		next();
	} catch (err) {
		next(err);
	}
};

const allowAnyElectionStatus = async (req, res, next) => {
	try {
		const election = await electionRepository.getElectionStatus();
		req.electionStatus = election.electionStatus;
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	ensureElectionStarted,
	ensureElectionNotStarted,
	ensureElectionCompleted,
	allowAnyElectionStatus,
};
