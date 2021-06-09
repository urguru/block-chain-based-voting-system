const {
	StatusCodes: { BAD_REQUEST, FORBIDDEN, UNAUTHORIZED },
} = require("http-status-codes");
function AppError(options) {
	this.name = options.name || "Error";
	this.message = options.message || "An error occurred.";
	this.details = options.details || undefined;
	this.statusCode = options.statusCode;
	this.errorCode = options.errorCode || "";
	Error.captureStackTrace(this, AppError);
}

const ER_AUTHENTICATION_INFO_NOT_FOUND = new AppError({
	name: "ER_AUTHENTICATION_INFO_NOT_FOUND",
	message: "Unable to find authorization details",
	statusCode: UNAUTHORIZED,
});

const ER_INVALID_AUTHENTICATION_INFO = new AppError({
	name: "ER_AUTHENTICATION_INFO_NOT_FOUND",
	message: "Invalid authentication info passed into the Authorization header",
	statusCode: UNAUTHORIZED,
});

const ER_INVALID_LOGIN_CREDENTIALS = new AppError({
	name: "ER_INVALID_LOGIN_CREDENTIALS",
	message: "Invalid Email-ID or Password",
	statusCode: UNAUTHORIZED,
});

const ER_FORBIDDEN = new AppError({
	name: "ER_FORBIDDEN",
	message: "Forbidden",
	statusCode: FORBIDDEN,
});

const ER_CONSTITUENCY_ALREADY_EXISTS = new AppError({
	name: "ER_CONSTITUENCY_ALREADY_EXISTS",
	message: "A constituency with the given constituencyId already exists",
	statusCode: BAD_REQUEST,
});

const ER_INVALID_CONSTITUENCY = new AppError({
	name: "ER_INVALID_CONSTITUENCY",
	message: "There is no constituency with the given constituencyId or it is invalid",
	statusCode: BAD_REQUEST,
});

const ER_CITIZEN_ALREADY_EXISTS = new AppError({
	name: "ER_CITIZEN_ALREADY_EXISTS",
	message: "A citizen with the given voterId already exists",
	statusCode: BAD_REQUEST,
});

const ER_CANDIDATE_ALREADY_EXISTS = new AppError({
	name: "ER_CANDIDATE_ALREADY_EXISTS",
	message: "A candidate with the given voterId already exists",
	statusCode: BAD_REQUEST,
});

const ER_INVALID_VOTER_ID = new AppError({
	name: "ER_INVALID_VOTER_ID",
	message: "There does not exist any citizen with the given voterId",
	statusCode: BAD_REQUEST,
});

const ER_POLLINGBOOTH_ALREADY_EXISTS = new AppError({
	name: "ER_POLLINGBOOTH_ALREADY_EXISTS",
	message: "A pollingBooth with the given pollingBoothId already exists",
	statusCode: BAD_REQUEST,
});

module.exports = {
	ER_FORBIDDEN,
	ER_AUTHENTICATION_INFO_NOT_FOUND,
	ER_INVALID_AUTHENTICATION_INFO,
	ER_INVALID_LOGIN_CREDENTIALS,
	ER_CONSTITUENCY_ALREADY_EXISTS,
	ER_INVALID_CONSTITUENCY,
	ER_CITIZEN_ALREADY_EXISTS,
	ER_CANDIDATE_ALREADY_EXISTS,
	ER_INVALID_VOTER_ID,
	ER_POLLINGBOOTH_ALREADY_EXISTS,
};
