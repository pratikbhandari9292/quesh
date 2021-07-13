const express = require("express");

const { auth } = require("../middleware/auth");
const { validateGroup } = require("../validation/group.validation");
const Group = require("../models/Group");

const router = express.Router();

//create a group
router.post("/create", auth, async (request, response) => {
	const groupInfo = request.body;

	//checking to see if the group has any errors
	const error = validateGroup(groupInfo);

	if (error) {
		return response.status(400).send({ error });
	}

	//creating a new group instance
	const group = new Group({
		...groupInfo,
	});

	try {
		//saving the group to the database
		const savedGroup = await group.save();
		response.status(201).send({ group: savedGroup });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//get details of a group
router.get("/:groupID", auth, async (request, response) => {
	try {
		//getting the group with the given id
		const group = await Group.findById(request.params.groupID).populate(
			"owner"
		);

		if (!group) {
			return response.status(400).send({ error: "group not found" });
		}

		return response.send(group);
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

module.exports = router;
