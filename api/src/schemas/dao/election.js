const mongoose = require("mongoose");
const _ = require("lodash");
const { electionStatus } = require("../../common/constants");
const { Schema } = mongoose;

const ElectionSchema = new Schema(
	{
		electionStatus: {
			type: String,
			enum: _.values(electionStatus),
			default: electionStatus.NOT_STARTED,
		},
		startedAt: {
			type: Date,
		},
		completedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

const Election = mongoose.model("Election", ElectionSchema);

module.exports = Election;
