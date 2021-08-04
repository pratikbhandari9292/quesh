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

//get the groups a user is a member of
router.get("/:userID/groups", auth, async (request, response) => {
	try {
		//checking to see if the user exists
		const user = await User.findById(request.params.userID);

		if (!user) {
			return response.status(400).send({ error: "user not found" });
		}

		//getting the groups that the user is a member of
		const groups = await Group.find({
			_id: { $in: user.groups.map((group) => group._id) },
		})
			.sort({ createdAt: -1 })
			.populate("owner");

		// const groupsWithJoinedDate = groups.map((group) => {
		// 	return {
		// 		...group.toObject(),
		// 		joinedAt: user.groups.find(
		// 			(userGroup) => userGroup._id == group._id
		// 		).joinedAt,
		// 	};
		// });

		response.send({ groups });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

module.exports = router;
