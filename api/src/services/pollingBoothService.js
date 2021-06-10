const { ER_POLLINGBOOTH_ALREADY_EXISTS, ER_INVALID_POLLINGBOOTH_ID } = require("../common/errors");
const pollingBoothRepository = require("../repositories/pollingBoothRepository");

const createPollingBooth = async (pollingBooth) => {
	const existingPollingBooth = await pollingBoothRepository.getPollingBoothByPollingBoothId(pollingBooth.pollingBoothId);
	if (!existingPollingBooth) {
		const result = await pollingBoothRepository.createPollingBooth(pollingBooth);
		return getClientPresentableResult(result);
	} else {
		throw ER_POLLINGBOOTH_ALREADY_EXISTS;
	}
};

const getPollingBoothByPollingBoothId = async (pollingBoothId) => {
	const pollingBooth = await pollingBoothRepository.getPollingBoothByPollingBoothId(pollingBoothId);
	if (pollingBooth) {
		return getClientPresentableResult(pollingBooth);
	} else {
		throw ER_INVALID_POLLINGBOOTH_ID;
	}
};

const getClientPresentableResult = (pollingBooth) => {
	const structuredResult = {
		name: pollingBooth.name,
		pollingBoothId: pollingBooth.pollingBoothId,
		createdAt: pollingBooth.createdAt,
		updatedAt: pollingBooth.updatedAt,
		maleVoteCount: pollingBooth.maleVoteCount,
		femaleVoteCount: pollingBooth.femaleVoteCount,
		otherVoteCount: pollingBooth.otherVoteCount,
	};
	return structuredResult;
};

module.exports = {
	createPollingBooth,
	getPollingBoothByPollingBoothId,
};
