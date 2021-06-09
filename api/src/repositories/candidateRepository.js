const Candidate = require("../schemas/dao/candidate");

const getCandidateByVoterId = async (voterId) => {
	const result = await Candidate.findOne({ voterId });
	return result;
};

const createCandidate = async (candidate) => {
	const result = await Candidate.create(candidate);
	return result;
};

module.exports = {
	getCandidateByVoterId,
	createCandidate,
};