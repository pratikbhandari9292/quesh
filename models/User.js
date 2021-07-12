const mongoose = require("mongoose");

//defining a schema for user
const userSchema = new mongoose.Schema(
	{
		username: String,
		email: String,
		password: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
