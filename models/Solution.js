const mongoose = require("mongoose");

//creating a schema for solution
const solutionSchema = new mongoose.Schema(
	{
		description: String,
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		approved: { type: Boolean, default: false },
		image: { type: Boolean, default: false },
		question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
