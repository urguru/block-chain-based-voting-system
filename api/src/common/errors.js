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

const ER_INVALID_CANDIDATE_VOTER_ID = new AppError({
	name: "ER_INVALID_CANDIDATE_VOTER_ID",
	message: "There does not exist any candidate with the given voterId",
	statusCode: BAD_REQUEST,
});

const ER_CANNOT_VOTE = new AppError({
	name: "ER_CANNOT_VOTE",
	message: "You cannot vote for the candidate as you and the candidate do not belong to same constituency",
	statusCode: BAD_REQUEST,
});

const ER_ALREADY_VOTED = new AppError({
	name: "ER_ALREADY_VOTED",
	message: "The candidate with the given voterId has already casted his vote",
	statusCode: BAD_REQUEST,
});

const ER_INVALID_ELECTION_STATUS_UPDATE_REQUEST = new AppError({
	name: "ER_INVALID_ELECTION_STATUS_UPDATE_REQUEST",
	message: "Invalid update requested for election status",
	statusCode: BAD_REQUEST,
});

const ER_ELECTION_NOT_IN_STARTED_STATE = new AppError({
	name: "ER_ELECTION_NOT_IN_STARTED_STATE",
	message: "The election state is not in started state. It is either not started/completed",
	statusCode: BAD_REQUEST,
});

const ER_ELECTION_NOT_IN_NOT_STARTED_STATE = new AppError({
	name: "ER_ELECTION_NOT_IN_NOT_STARTED_STATE",
	message: "The election state is not in not started state. It is either started/completed",
	statusCode: BAD_REQUEST,
});

const ER_ELECTION_NOT_IN_COMPLETED_STATE = new AppError({
	name: "ER_ELECTION_NOT_IN_COMPLETED_STATE",
	message: "The election state is not in completed state. It is either started/not started",
	statusCode: BAD_REQUEST,
});

const ER_ADMIN_WTH_EMAIL_ID_ALREADY_EXISTS = new AppError({
	name: "ER_ADMIN_WTH_EMAIL_ID_ALREADY_EXISTS",
	message: "An admin already exists with the given emailId",
	statusCode: BAD_REQUEST,
});

const ER_INVALID_POLLINGBOOTH_ID = new AppError({
	name: "ER_INVALID_POLLINGBOOTH_ID",
	message: "There does not exist any polling booth with the given pollingBoothId",
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
	ER_INVALID_CANDIDATE_VOTER_ID,
	ER_CANNOT_VOTE,
	ER_ALREADY_VOTED,
	ER_INVALID_ELECTION_STATUS_UPDATE_REQUEST,
	ER_ELECTION_NOT_IN_STARTED_STATE,
	ER_ELECTION_NOT_IN_NOT_STARTED_STATE,
	ER_ELECTION_NOT_IN_COMPLETED_STATE,
	ER_ADMIN_WTH_EMAIL_ID_ALREADY_EXISTS,
	ER_INVALID_POLLINGBOOTH_ID,
};
