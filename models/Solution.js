const mongoose = require("mongoose");

//creating a schema for solution
const solutionSchema = new mongoose.Schema(
	{
		description: String,
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		approved: { type: Boolean, default: false },
		images: { type: Array, default: [] },
		question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
	},
	{ timestamps: true },
	{ _id: false }
);

module.exports = mongoose.model("Solution", solutionSchema);
