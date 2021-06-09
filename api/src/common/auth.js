const _ = require("lodash");
const jwt = require("jsonwebtoken");

const generateAuthToken = (payload) => {
	const token = jwt.sign(payload, process.env.JSON_WEB_SECRET);
	return token;
};

const hasAnyRole = (admin, roles) => {
	if (_.isEmpty(admin)) return false;
	return !_.isEmpty(admin) && !_.isEmpty(admin.role) && _.includes(roles, admin.role);
};

module.exports = {
	generateAuthToken,
	hasAnyRole,
};
