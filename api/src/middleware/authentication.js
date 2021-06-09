const jwt = require("jsonwebtoken");
const { ER_AUTHENTICATION_INFO_NOT_FOUND, ER_INVALID_AUTHENTICATION_INFO } = require("../common/errors");
const logger = require("../logging/logger");

const getAuthInfo = async (req, res, next) => {
	const authenticationInfo = req.header("Authorization");
	if (authenticationInfo) {
		const token = authenticationInfo.replace("Bearer ", "");
		try {
			payload = jwt.verify(token, process.env.JSON_WEB_SECRET);
			logger.info(`Payload ${JSON.stringify(payload)}`);
			req.admin = payload;
			next();
		} catch (err) {
			logger.error(`Authentication::getAuthInfo Error:${err.message}`);
			next(ER_INVALID_AUTHENTICATION_INFO);
		}
	} else {
		next(ER_AUTHENTICATION_INFO_NOT_FOUND);
	}
};

module.exports = getAuthInfo;
