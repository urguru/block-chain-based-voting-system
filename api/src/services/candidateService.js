const {
	ER_INVALID_CONSTITUENCY,
	ER_CANDIDATE_ALREADY_EXISTS,
	ER_INVALID_VOTER_ID,
	ER_INVALID_CANDIDATE_VOTER_ID,
} = require("../common/errors");
const citizenRepository = require("../repositories/citizenRepository");
const candidateRepository = require("../repositories/candidateRepository");
const constituencyRepository = require("../repositories/constituencyRepository");
const { electionStatus } = require("../common/constants");

const createCandidate = async (candidate) => {
	const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(candidate.contestingConstituencyId);
	if (existingConstituency) {
		const existingCitizen = await citizenRepository.getCitizenByVoterId(candidate.voterId);
		if (existingCitizen) {
			const existingCandidate = await candidateRepository.getCandidateByVoterId(candidate.voterId);
			if (!existingCandidate) {
				const result = await candidateRepository.createCandidate(candidate);
				return await getClientPresentableResult(result, electionStatus.NOT_STARTED);
			} else {
				throw ER_CANDIDATE_ALREADY_EXISTS;
			}
		} else {
			throw ER_INVALID_VOTER_ID;
		}
	} else {
		throw ER_INVALID_CONSTITUENCY;
	}
};

const getCandidateByVoterId = async (voterId, status) => {
	const candidate = await candidateRepository.getCandidateByVoterId(voterId);
	if (candidate) {
		return await getClientPresentableResult(candidate, status);
	} else {
		throw ER_INVALID_CANDIDATE_VOTER_ID;
	}
};

const getClientPresentableResult = async (candidate, status) => {
	await candidate.populate("citizen").execPopulate();
	await candidate.citizen.populate("constituency").execPopulate();
	await candidate.populate("contestingConstituency").execPopulate();
	const structuredCandidate = {
		voterId: candidate.voterId,
		citizen: {
			name: candidate.citizen.name,
			gender: candidate.citizen.gender,
			constituency: {
				constituencyId: candidate.citizen.constituency.constituencyId,
				name: candidate.citizen.constituency.name,
			},
		},
		contestingConstituency: {
			constituencyId: candidate.contestingConstituency.constituencyId,
			name: candidate.contestingConstituency.name,
		},
		createdAt: candidate.createdAt,
		updatedAt: candidate.updatedAt,
	};
	if (status != electionStatus.STARTED) {
		structuredCandidate.maleVoteCount = candidate.malevoteCount;
		structuredCandidate.femaleVoteCount = candidate.femaleVoteCount;
		structuredCandidate.otherVoteCount = candidate.otherVoteCount;
	}
	return structuredCandidate;
};

module.exports = {
	createCandidate,
	getCandidateByVoterId,
};
