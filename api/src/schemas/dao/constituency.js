const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConstituencySchema = new Schema(
	{
		constituencyId: {
			type: Number,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		registeredMaleVoters: {
			type: Number,
			default: 0,
		},
		registeredFemaleVoters: {
			type: Number,
			default: 0,
		},
		registeredOtherVoters: {
			type: Number,
			default: 0,
		},
		maleVoteCount: {
			type: Number,
			default: 0,
		},
		femaleVoteCount: {
			type: Number,
			default: 0,
		},
		otherVoteCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Constituency = mongoose.model("Constituency", ConstituencySchema);

module.exports = Constituency;