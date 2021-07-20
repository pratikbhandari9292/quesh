const mongoose = require("mongoose");

//creating a schema for group
const groupSchema = new mongoose.Schema(
	{
		title: String,
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		members: {
			type: Array,
			default: [],
		},
		memberJoinRequests: {
			type: [{ type: mongoose.Schema.Types.ObjectId }],
			default: [],
		},
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
