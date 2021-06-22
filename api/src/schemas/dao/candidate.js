const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;

const CandidateSchema = new Schema(
	{
		voterId: {
			type: String,
			required: true,
			trim: true,
			lowercasse: true,
			unique: true,
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
		contestingConstituencyId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

CandidateSchema.virtual("contestingConstituency", {
	ref: "Constituency",
	localField: "contestingConstituencyId",
	foreignField: "constituencyId",
	justOne: true,
});

CandidateSchema.virtual("citizen", {
	ref: "Citizen",
	localField: "voterId",
	foreignField: "voterId",
	justOne: true,
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
