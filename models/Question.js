const mongoose = require("mongoose");

//creating a schema for question
const questionSchema = new mongoose.Schema(
	{
		description: String,
		about: {
			type: Array,
			default: [],
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
			default: null,
		},
		submittedForApproval: {
			type: Boolean,
			default: false,
		},
		solved: {
			type: Boolean,
			default: false,
		},
		image: {
			type: Boolean,
			default: false,
		},
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
