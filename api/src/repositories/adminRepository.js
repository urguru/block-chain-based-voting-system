const Admin = require("../schemas/dao/admin");

const createAdmin = async (admin) => {
	const result = await Admin.create(admin);
	return result;
};

module.exports = {
	createAdmin,
};
