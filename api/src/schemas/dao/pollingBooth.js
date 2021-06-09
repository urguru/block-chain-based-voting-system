const mongoose = require("mongoose");
const { Schema } = mongoose;

const PollingBoothSchema = new Schema(
	{
		pollingBoothId: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
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

const PollingBooth = mongoose.model("PollingBooth", PollingBoothSchema);

module.exports = PollingBooth;
