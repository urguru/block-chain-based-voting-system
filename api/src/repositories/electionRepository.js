const Election = require("../schemas/dao/election");
const { electionStatus } = require("../common/constants");

const getElectionStatus = async () => {
	var result = await Election.findOne();
	if (!result) {
		result = await Election.create({ electionStatus: electionStatus.NOT_STARTED });
	}
	return result;
};

const updateElectionStatus = async (updateStatus) => {
	const election = await getElectionStatus();
	election.electionStatus = updateStatus;
	if (updateStatus == electionStatus.STARTED) {
		election.startedAt = Date.now();
	} else if (updateStatus == electionStatus.COMPLETED) {
		election.completedAt = Date.now();
	}
	await election.save();
	return election;
};

module.exports = {
	getElectionStatus,
	updateElectionStatus,
};
