const { generateAuthToken } = require("../common/auth");
const adminRepository = require("../repositories/adminRepository");
const Admin = require("../schemas/dao/admin");

const createAdmin = async (admin) => {
	const result = await adminRepository.createAdmin(admin);
	const structuredResult = {
		id: result._id,
		name: result.name,
		gender: result.gender,
		role: result.role,
		email: result.email,
		createdAt: result.createdAt,
		updatedAt: result.updatedAt,
	};
	return structuredResult;
};

const loginAdmin = async (email, password) => {
	const admin = await Admin.findByCredentials(email, password);
	const payload = {
		id: admin.id,
		role: admin.role,
		email: admin.email,
	};
	const jwtToken = generateAuthToken(payload);
	return jwtToken;
};

module.exports = {
	createAdmin,
	loginAdmin,
};
