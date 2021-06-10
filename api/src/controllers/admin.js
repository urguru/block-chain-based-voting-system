const adminService = require("../services/adminService");
const { hasAnyRole } = require("../common/auth");
const { roles } = require("../common/constants");
const logger = require("../logging/logger");
const {
	StatusCodes: { CREATED, OK },
} = require("http-status-codes");
const { ER_FORBIDDEN } = require("../common/errors");

const createAdmin = async (req, res, next) => {
	const { admin } = req;
	logger.info(`AdminController::createAdmin Received request to create an admin with the following Email-Id:${req.body.email}`);
	try {
		if (hasAnyRole(admin, [roles.CEC])) {
			const result = await adminService.createAdmin(req.body);
			res.status(CREATED).json(result);
		} else {
			throw ER_FORBIDDEN;
		}
	} catch (err) {
		next(err);
	}
};

const loginAdmin = async (req, res, next) => {
	const { body } = req;
	const { email, password } = body;
	logger.info(req.admin);
	logger.info(`AdminController::loginAdmin Received request for login from the following Email-Id:${email}`);
	try {
		const result = await adminService.loginAdmin(email, password);
		res.status(OK).json(result);
	} catch (err) {
		next(err);
	}
};

const getAdminByPollingBoothId = async (req, res, next) => {
	const { pollingBoothId } = req.params;
	logger.info(`AdminController::getAdminByPollingBoothId Received request with voterId:${pollingBoothId}`);
	try {
		const result = await adminService.getAdminByPollingBoothId(pollingBoothId);
		res.status(OK).json(result);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createAdmin,
	loginAdmin,
	getAdminByPollingBoothId,
};
