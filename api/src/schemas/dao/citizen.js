const mongoose = require("mongoose");
const _ = require("lodash");

const { gender } = require("../../common/constants");
const { Schema } = mongoose;

const CitizenSchema = new Schema(
	{
		voterId: {
			type: String,
			required: true,
			trim: true,
			lowercasse: true,
			unique: true,
		},
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
		hasVoted: {
			type: Boolean,
			default: false,
		},
		pollingBoothId: {
			type: String,
		},
		timeVotedAt: {
			type: Date,
		},
		constituencyId: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

CitizenSchema.virtual("constituency", {
	ref: "Constituency",
	localField: "constituencyId",
	foreignField: "constituencyId",
	justOne: true,
});

CitizenSchema.virtual("pollingBooth", {
	ref: "PollingBooth",
	localField: "pollingBoothId",
	foreignField: "pollingBoothId",
	justOne:true,
})

const Citizen = mongoose.model("Citizen", CitizenSchema);

module.exports = Citizen;
