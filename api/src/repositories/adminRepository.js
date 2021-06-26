const Admin = require("../schemas/dao/admin");
const PollingBooth = require("../schemas/dao/pollingBooth");
const constants = require('../common/constants');
const mongoose = require("mongoose");
const logger = require("../logging/logger");

const createAdmin = async (admin) => {
	const result = await Admin.create(admin);
	return result;
};

const getAdminByPollingBoothId = async (pollingBoothId) => {
	const result = await Admin.findOne({ pollingBoothId });
	return result;
};

const getAdminByEmailId = async (email) => {
	const result = await Admin.findOne({ email });
	return result;
};

const getCECDetails = async () => {
	const result = await Admin.findOne({ role: constants.roles.CEC });
	return result;
}

const createCECWithGenesisPollingBooth = async (admin, pollingBooth) => {
	const sessionOptions = { retryWrites: true, causalConsistency: true };
	const session = await mongoose.startSession(sessionOptions);
	const saveOptions = { validateBeforeSave: true, session, new: true };

	try {
		session.startTransaction();
		await PollingBooth.create([pollingBooth], saveOptions);
		await Admin.create([admin], saveOptions);
		await session.commitTransaction();
	} catch (startSessionError) {
		await session.abortTransaction();
		throw startSessionError;
	}
}

module.exports = {
	createAdmin,
	getAdminByPollingBoothId,
	getAdminByEmailId,
	getCECDetails,
	createCECWithGenesisPollingBooth,
};
