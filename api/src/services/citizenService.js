const { result } = require("lodash");
const { ER_INVALID_CONSTITUENCY, ER_CITIZEN_ALREADY_EXISTS, ER_INVALID_VOTER_ID } = require("../common/errors");
const citizenRepository = require("../repositories/citizenRepository");
const constituencyRepository = require("../repositories/constituencyRepository");

const getCitizenByVoterId = async (voterId) => {
	const citizen = await citizenRepository.getCitizenByVoterId(voterId);
	if (citizen) {
		await citizen.populate("constituency").execPopulate();
		const structuredResult = {
			voterId: citizen.voterId,
			name: citizen.name,
			gender: citizen.gender,
			constituency: {
				constituencyId: citizen.constituency.constituencyId,
				name: citizen.constituency.name,
			},
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
	} else {
		throw ER_INVALID_VOTER_ID;
	}
};

const createCitizen = async (citizen) => {
	const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(citizen.constituencyId);
	if (existingConstituency) {
		const existingCitizen = await citizenRepository.getCitizenByVoterId(citizen.voterId);
		if (!existingCitizen) {
			const result = await citizenRepository.createCitizen(citizen);
			const structuredResult = {
				voterId: result.voterId,
				name: result.name,
				gender: result.gender,
				constituency: {
					constituencyId: existingConstituency.constituencyId,
					name: existingConstituency.name,
				},
				createdAt: result.createdAt,
				updatedAt: result.updatedAt,
			};
			return structuredResult;
		} else {
			throw ER_CITIZEN_ALREADY_EXISTS;
		}
	} else {
		throw ER_INVALID_CONSTITUENCY;
	}
};

module.exports = {
	createCitizen,
	getCitizenByVoterId,
};
