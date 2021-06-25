const {
	ER_INVALID_CONSTITUENCY,
	ER_CITIZEN_ALREADY_EXISTS,
	ER_INVALID_VOTER_ID,
	ER_INVALID_CANDIDATE_VOTER_ID,
	ER_CANNOT_VOTE,
	ER_ALREADY_VOTED,
} = require("../common/errors");
const citizenRepository = require("../repositories/citizenRepository");
const constituencyRepository = require("../repositories/constituencyRepository");
const candidateRepository = require("../repositories/candidateRepository");
const pollingBoothRepository = require("../repositories/pollingBoothRepository");
const constituencyService = require("./constituencyService");
const { electionStatus } = require("../common/constants");

const getCitizenByVoterId = async (voterId, electionStatus) => {
	const citizen = await citizenRepository.getCitizenByVoterId(voterId);
	if (citizen) {
		const constituency = await constituencyService.getConstituencyByConstituencyId(citizen.constituencyId, electionStatus)
		return await getClientPresentableResult(citizen, constituency);
	} else {
		throw ER_INVALID_VOTER_ID;
	}
};

const createCitizen = async (citizen) => {
	const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(citizen.constituencyId);
	if (existingConstituency) {
		const clientPresentableConstituency = await constituencyService.getConstituencyByConstituencyId(citizen.constituencyId, electionStatus.NOT_STARTED);
		const existingCitizen = await citizenRepository.getCitizenByVoterId(citizen.voterId);
		if (!existingCitizen) {
			const result = await citizenRepository.createCitizen(citizen, existingConstituency);
			return await getClientPresentableResult(result, clientPresentableConstituency);
		} else {
			throw ER_CITIZEN_ALREADY_EXISTS;
		}
	} else {
		throw ER_INVALID_CONSTITUENCY;
	}
};

const getClientPresentableResult = async (citizen, constituency) => {
	await citizen.populate("constituency").execPopulate();
	var structuredResult = {
		voterId: citizen.voterId,
		name: citizen.name,
		gender: citizen.gender,
		constituency,
		hasVoted: citizen.hasVoted,
		createdAt: citizen.createdAt,
		updatedAt: citizen.updatedAt,
	};
	if (citizen.hasVoted) {
		await citizen.populate("pollingBooth").execPopulate();
		structuredResult = {
			...structuredResult,
			pollingBooth: {
				pollingBoothId: citizen.pollingBooth.pollingBoothId,
				name: citizen.pollingBooth.name,
			},
			timeVotedAt: citizen.timeVotedAt,
		};
	}
	return structuredResult;
};

const voteForCandidate = async (voterId, candidateVoterId, pollingBoothId) => {
	const existingCandidate = await candidateRepository.getCandidateByVoterId(candidateVoterId);
	if (existingCandidate) {
		const existingVoter = await citizenRepository.getCitizenByVoterId(voterId);
		if (existingVoter) {
			if (existingVoter.constituencyId == existingCandidate.contestingConstituencyId) {
				if (!existingVoter.hasVoted) {
					const existingPollingBooth = await pollingBoothRepository.getPollingBoothByPollingBoothId(pollingBoothId);
					const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(existingVoter.constituencyId);
					await citizenRepository.voteForCandidate(existingVoter, existingCandidate, existingPollingBooth, existingConstituency);
					return await getCitizenByVoterId(voterId);
				} else {
					throw ER_ALREADY_VOTED;
				}
			} else {
				throw ER_CANNOT_VOTE;
			}
		} else {
			throw ER_INVALID_VOTER_ID;
		}
	} else {
		throw ER_INVALID_CANDIDATE_VOTER_ID;
	}
};

module.exports = {
	createCitizen,
	getCitizenByVoterId,
	voteForCandidate,
};
