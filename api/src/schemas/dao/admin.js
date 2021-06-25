const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { gender, roles } = require("../../common/constants");
const { ER_INVALID_LOGIN_CREDENTIALS } = require("../../common/errors");

const AdminSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		gender: {
			type: String,
			enum: _.values(gender),
			required: true,
		},
		role: {
			type: String,
			enum: _.values(roles),
			required: true,
			default: roles.PBO,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		pollingBoothId: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	},

);

AdminSchema.virtual("pollingBooth", {
	ref: "PollingBooth",
	localField: "pollingBoothId",
	foreignField: "pollingBoothId",
	justOne: true,
});

AdminSchema.pre("save", async function (next) {
	const admin = this;
	if (admin.isModified("password")) {
		admin.password = await bcrypt.hash(admin.password, 8);
	}
	next();
});

AdminSchema.statics.findByCredentials = async (email, password) => {
	const admin = await Admin.findOne({ email });
	if (!admin) {
		throw ER_INVALID_LOGIN_CREDENTIALS;
	}
	const isMatch = await bcrypt.compare(password, admin.password);
	if (!isMatch) {
		throw ER_INVALID_LOGIN_CREDENTIALS;
	}
	return admin;
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
