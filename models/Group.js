const mongoose = require("mongoose");

//creating a schema for group
const groupSchema = new mongoose.Schema(
	{
		title: String,
		about: { type: String, default: "" },
		description: String,
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		createdBy: mongoose.Schema.Types.ObjectId,
		memberJoinRequests: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
			default: [],
		},
		joinID: {
			type: String,
			default: "",
		},
		noOfMembers: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
