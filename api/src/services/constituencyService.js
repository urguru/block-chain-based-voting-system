const _ = require("lodash");
const { ER_CONSTITUENCY_ALREADY_EXISTS } = require("../common/errors");
const constituencyRepository = require("../repositories/constituencyRepository");
const { electionStatus } = require("../common/constants");

const createConstituency = async (constituency) => {
	const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(constituency.constituencyId);
	if (!existingConstituency) {
		const result = await constituencyRepository.createConstituency(constituency);
		const structuredResult = await getClientPresentableResult(result, electionStatus.NOT_STARTED);
		return structuredResult;
	} else {
		throw ER_CONSTITUENCY_ALREADY_EXISTS;
	}
};

const getConstituencyByConstituencyId = async (constituencyId, status) => {
	const result = await constituencyRepository.getConstituencyByConstituencyId(constituencyId);
	if (result) {
		const structuredResult = await getClientPresentableResult(result, status);
		return structuredResult;
	} else {
		throw ER_INVALID_CONSTITUENCY;
	}
};

const getClientPresentableResult = async (constituency, status) => {
	const structuredResult = {
		name: constituency.name,
		constituencyId: constituency.constituencyId,
		registeredMaleVoters: constituency.registeredMaleVoters,
		registeredFemaleVoters: constituency.registeredFemaleVoters,
		registeredOtherVoters: constituency.registeredOtherVoters,
		maleVoteCount: constituency.maleVoteCount,
		femaleVoteCount: constituency.femaleVoteCount,
		otherVoteCount: constituency.otherVoteCount,
		createdAt: constituency.createdAt,
		updatedAt: constituency.updatedAt,
	};
	await constituency.populate("candidates").execPopulate();
	if (!_.isNull(constituency.candidates) && !_.isEmpty(constituency.candidates)) {
		const promises = constituency.candidates.map((candidate) => getStructuredCandidate(candidate, status));
		const structuredCandidates = await Promise.all(promises);
		structuredResult.candidates = structuredCandidates;
	} else {
		structuredResult.candidates = [];
	}
	return structuredResult;
};

const getStructuredCandidate = async (candidate, status) => {
	await candidate.populate("citizen").execPopulate();
	await candidate.citizen.populate("constituency").execPopulate();
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
		createdAt: candidate.createdAt,
		updatedAt: candidate.updatedAt,
	};
	if (status == electionStatus.COMPLETED) {
		structuredCandidate.maleVoteCount = candidate.maleVoteCount;
		structuredCandidate.femaleVoteCount = candidate.femaleVoteCount;
		structuredCandidate.otherVoteCount = candidate.otherVoteCount;
	}
	return structuredCandidate;
};

module.exports = {
	createConstituency,
	getConstituencyByConstituencyId,
};
