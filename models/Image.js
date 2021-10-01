const mongoose = require("mongoose");

//defining a schema for image
const imageSchema = new mongoose.Schema({
	binary: {
		type: Buffer,
	},
	user: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Image", imageSchema);
