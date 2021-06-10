const Admin = require("../schemas/dao/admin");

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

module.exports = {
	createAdmin,
	getAdminByPollingBoothId,
	getAdminByEmailId
};
