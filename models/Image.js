const mongoose = require("mongoose");

//defining a schema for image
const imageSchema = new mongoose.Schema({
	binary: {
		type: Buffer,
	},
	user: mongoose.Schema.Types.ObjectId,
	question: mongoose.Schema.Types.ObjectId,
	solution: mongoose.Schema.Types.ObjectId,
	randomStr: {
		type: String,
	},
	src: String,
});

module.exports = mongoose.model("Image", imageSchema);
