const mongoose = require("mongoose");

//creating a schema for group
const groupSchema = new mongoose.Schema(
	{
		title: String,
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		memberJoinRequests: {
			type: [{ type: mongoose.Schema.Types.ObjectId }],
			default: [],
		},
		joinID: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
