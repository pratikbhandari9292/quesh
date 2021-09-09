const express = require("express");

const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Group = require("../models/Group");

const router = express.Router();

//get the details of a user
router.get("/:userID", auth, async (request, response) => {
	try {
		//checking to see if the user exists
		const user = await User.findById(request.params.userID);

		if (!user) {
			return response.status(400).send({ error: "user not found" });
		}

		response.send({ user });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//search user
router.get("/search/:searchTerm", auth, async (request, response) => {
	const searchRegularExpression = new RegExp(request.params.searchTerm, "i");

	try {
		const users = await User.find({
			$or: [
				{ username: { $regex: searchRegularExpression } },
				{ email: { $regex: searchRegularExpression } },
			],
		});

		response.send({
			users: users.filter((user) => user._id != request.user),
		});
	} catch (error) {
		reponse.status(500).send({ error: error.message });
	}
});

module.exports = router;
