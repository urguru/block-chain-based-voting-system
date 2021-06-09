const PollingBooth = require("../schemas/dao/pollingBooth");

const createPollingBooth = async (pollingBooth) => {
	const result = await PollingBooth.create(pollingBooth);
	return result;
};

const getPollingBoothByPollingBoothId = async (pollingBoothId) => {
	const result = await PollingBooth.findOne({ pollingBoothId });
	return result;
};

module.exports = {
	createPollingBooth,
	getPollingBoothByPollingBoothId,
};
