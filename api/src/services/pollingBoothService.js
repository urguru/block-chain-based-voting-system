const { ER_POLLINGBOOTH_ALREADY_EXISTS } = require("../common/errors");
const pollingBoothRepository = require("../repositories/pollingBoothRepository");

const createPollingBooth = async (pollingBooth) => {
	const existingPollingBooth = await pollingBoothRepository.getPollingBoothByPollingBoothId(pollingBooth.pollingBoothId);
	if (!existingPollingBooth) {
		const result = await pollingBoothRepository.createPollingBooth(pollingBooth);
		const structuredResult = {
			name: result.name,
			pollingBoothId: result.pollingBoothId,
			createdAt: result.createdAt,
			updatedAt: result.updatedAt,
		};
		return structuredResult;
	} else {
		throw ER_POLLINGBOOTH_ALREADY_EXISTS;
	}
};

module.exports = {
	createPollingBooth,
};
