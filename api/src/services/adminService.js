const _ = require("lodash");
const { generateAuthToken } = require("../common/auth");
const { ER_ADMIN_WTH_EMAIL_ID_ALREADY_EXISTS, ER_INVALID_POLLINGBOOTH_ID } = require("../common/errors");
const adminRepository = require("../repositories/adminRepository");
const pollingBoothRepository = require("../repositories/pollingBoothRepository")
const Admin = require("../schemas/dao/admin");

const createAdmin = async (admin) => {
	const existingPollingBooth = await pollingBoothRepository.getPollingBoothByPollingBoothId(admin.pollingBoothId);
	if (!existingPollingBooth) {
		const existingAdmin = await adminRepository.getAdminByEmailId(admin.email);
		if (!existingAdmin) {
			const result = await adminRepository.createAdmin(admin);
			const structuredResult = await getClientPresentableResult(result);
			return structuredResult;
		} else {
			ER_ADMIN_WTH_EMAIL_ID_ALREADY_EXISTS;
		}
	} else {
		ER_INVALID_POLLINGBOOTH_ID;
	}
};

const loginAdmin = async (email, password) => {
	const admin = await Admin.findByCredentials(email, password);
	const payload = {
		id: admin.id,
		role: admin.role,
		email: admin.email,
	};
	if (!_.isUndefined(admin.pollingBoothId)) {
		payload.pollingBoothId = admin.pollingBoothId;
	}
	const jwtToken = generateAuthToken(payload);
	return {
		token: jwtToken,
		admin: {
			name: admin.name,
			gender: admin.gender,
			role: admin.role,
			email: admin.email,
			pollingBoothId: admin.pollingBoothId,
		}
	};
};

const getAdminByPollingBoothId = async (pollingBoothId) => {
	const admin = await adminRepository.getAdminByPollingBoothId(pollingBoothId);
	if (admin) {
		const structuredResult = await getClientPresentableResult(admin);
		return structuredResult;
	} else {
		throw ER_INVALID_POLLINGBOOTH_ID;
	}
};

const getClientPresentableResult = async (admin) => {
	await admin.populate("pollingBooth").execPopulate();
	const structuredResult = {
		name: admin.name,
		gender: admin.gender,
		role: admin.role,
		email: admin.email,
		pollingBooth: {
			name: admin.pollingBooth.name,
			pollingBoothId: admin.pollingBooth.pollingBoothId,
			createdAt: admin.pollingBooth.createdAt,
			updatedAt: admin.pollingBooth.updatedAt,
			maleVoteCount: admin.pollingBooth.maleVoteCount,
			femaleVoteCount: admin.pollingBooth.femaleVoteCount,
			otherVoteCount: admin.pollingBooth.otherVoteCount,
		},
		createdAt: admin.createdAt,
		updatedAt: admin.updatedAt,
	};
	return structuredResult;
};

module.exports = {
	createAdmin,
	loginAdmin,
	getAdminByPollingBoothId,
};
