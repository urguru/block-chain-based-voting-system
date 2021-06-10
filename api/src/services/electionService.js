const electionRepository = require("../repositories/electionRepository");
const { electionStatus } = require("../common/constants");
const { ER_INVALID_ELECTION_STATUS_UPDATE_REQUEST } = require("../common/errors");

const getElectionStatus = async () => {
	const election = await electionRepository.getElectionStatus();
	const structuredResult = getClientPresentableResult(election);
	return structuredResult;
};

const updateElectionStatus = async (updateStatus) => {
	var election = await getElectionStatus();
	if (election.electionStatus == updateStatus) {
		return getClientPresentableResult(election);
	} else if (election.electionStatus == electionStatus.NOT_STARTED && updateStatus == electionStatus.STARTED) {
		election = await electionRepository.updateElectionStatus(updateStatus);
	} else if (election.electionStatus == electionStatus.STARTED && updateStatus == electionStatus.COMPLETED) {
		election = await electionRepository.updateElectionStatus(updateStatus);
	} else {
		throw ER_INVALID_ELECTION_STATUS_UPDATE_REQUEST;
	}
	return getClientPresentableResult(election);
};

const getClientPresentableResult = (election) => {
	const structuredResult = {
		electionStatus: election.electionStatus,
		createdAt: election.createdAt,
		updatedAt: election.updatedAt,
	};
	if (election.electionStatus == electionStatus.STARTED) {
		structuredResult.startedAt = election.startedAt;
	} else if (election.electionStatus == electionStatus.COMPLETED) {
		structuredResult.startedAt = election.startedAt;
		structuredResult.completedAt = election.completedAt;
	}
	return structuredResult;
};

module.exports = {
	getElectionStatus,
	updateElectionStatus,
};
