const Citizen = require("../schemas/dao/citizen");
const mongoose = require("mongoose");
const { gender } = require("../common/constants");

const getCitizenByVoterId = async (voterId) => {
	const result = await Citizen.findOne({ voterId });
	return result;
};

const createCitizen = async (citizen, constituency) => {
	const sessionOptions = { retryWrites: true, causalConsistency: true };
	const session = await mongoose.startSession(sessionOptions);
	const saveOptions = { validateBeforeSave: true, session, new: true };

	try {
		session.startTransaction();
		if (citizen.gender == gender.MALE) {
			constituency.registeredMaleVoters += 1;
		} else if (citizen.gender == gender.FEMALE) {
			constituency.registeredFemaleVoters += 1;
		} else if (citizen.gender == gender.OTHER) {
			constituency.registeredOtherVoters += 1;
		}
		await constituency.save(saveOptions);
		const result = await Citizen.create([citizen], saveOptions);
		await session.commitTransaction();
		return result[0];
	} catch (startSessionError) {
		await session.abortTransaction();
		throw startSessionError;
	}
};

const voteForCandidate = async (voter, candidate, pollingBooth, constituency) => {
	const sessionOptions = { retryWrites: true, causalConsistency: true };
	const session = await mongoose.startSession(sessionOptions);
	const saveOptions = { validateBeforeSave: true, session, new: true };

	try {
		session.startTransaction();
		voter.hasVoted = true;
		voter.timeVotedAt = Date.now();
		voter.pollingBoothId = pollingBooth.pollingBoothId;
		if (voter.gender == gender.MALE) {
			candidate.maleVoteCount += 1;
			pollingBooth.maleVoteCount += 1;
			constituency.maleVoteCount += 1;
		} else if (voter.gender == gender.FEMALE) {
			candidate.femaleVoteCount += 1;
			pollingBooth.femaleVoteCount += 1;
			constituency.femaleVoteCount += 1;
		} else if (voter.gender == gender.OTHER) {
			candidate.otherVoteCount += 1;
			pollingBooth.otherVoteCount += 1;
			constituency.otherVoteCount += 1;
		}
		await voter.save(saveOptions);
		await candidate.save(saveOptions);
		await pollingBooth.save(saveOptions);
		await constituency.save(saveOptions);
		await session.commitTransaction();
	} catch (startSessionError) {
		await session.abortTransaction();
		throw startSessionError;
	} finally {
		session.endSession();
	}
};

module.exports = {
	getCitizenByVoterId,
	createCitizen,
	voteForCandidate,
};
