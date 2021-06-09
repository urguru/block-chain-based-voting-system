const { ER_INVALID_CONSTITUENCY, ER_CANDIDATE_ALREADY_EXISTS, ER_INVALID_VOTER_ID } = require("../common/errors");
const citizenRepository = require("../repositories/citizenRepository");
const candidateRepository = require("../repositories/candidateRepository");
const constituencyRepository = require("../repositories/constituencyRepository");

const createCandidate = async (candidate) => {
	const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(candidate.contestingConstituencyId);
	if (existingConstituency) {
		const existingCitizen = await citizenRepository.getCitizenByVoterId(candidate.voterId);
		if (existingCitizen) {
			const existingCandidate = await candidateRepository.getCandidateByVoterId(candidate.voterId);
			if (!existingCandidate) {
				const result = await candidateRepository.createCandidate(candidate);
				await existingCitizen.populate("constituency").execPopulate();
				const structuredResult = {
					voterId: result.voterId,
					citizen: {
						name: existingCitizen.name,
						gender: existingCitizen.gender,
						constituency: {
							constituencyId: existingCitizen.constituency.constituencyId,
							name: existingCitizen.constituency.name,
						},
					},
					contestingConstituency: {
						constituencyId: existingConstituency.constituencyId,
						name: existingConstituency.name,
					},
					createdAt: result.createdAt,
					updatedAt: result.updatedAt,
				};
				return structuredResult;
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

module.exports = {
	createCandidate,
};
