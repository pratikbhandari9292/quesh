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
		members: [request.user],
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

//add members to a group
router.post(
	"/:groupID/add",
	auth,
	validateGroupID,
	async (request, response) => {
		const members = request.body.members;

		try {
			//getting the group with the given id
			const group = await Group.findById(request.params.groupID);

			//checking to see if the requesting user is a member of the group
			//or the owner of the group
			if (
				!group.members.find((member) => member == request.user) &&
				group.owner != request.user
			) {
				return response
					.status(400)
					.send({ error: "only members can add members" });
			}

			//filtering out the members that already exist
			const membersToBeAdded = members.filter((member) => {
				if (
					group.members.find(
						(existingMember) => existingMember == member
					)
				) {
					return false;
				}

				return true;
			});

			membersToBeAdded.forEach((member) => {
				//adding each of the members to members array of the group
				group.members.push(member);

				//removing each of the members from memberJoinRequests array of the group
				group.memberJoinRequests.pull({ _id: member });
			});

			await group.save();

			response.status(201).send({ message: "members added" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//join a group
router.post(
	"/:groupID/join",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			//getting the group with the given id
			const group = await Group.findById(request.params.groupID);

			//checking to see if the requesting user is already in the group
			if (group.members.find((member) => member == request.user)) {
				return response
					.status(400)
					.send({ error: "you already exist in the group" });
			}

			//adding the requesting user to the members array of the group
			group.members.push(request.user);

			//removing the requesting user from the memberJoinRequests array of the group
			group.memberJoinRequests.pull({ _id: request.user });

			await group.save();

			response.status(201).send({ message: "joined group" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//request to join a group
router.post(
	"/:groupID/request",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			//getting the group of the provided id
			const group = await Group.findById(request.params.groupID);

			//checking to see if the requesting user has already made a request to join
			if (
				group.memberJoinRequests.find(
					(request) => request == request.user
				)
			) {
				return response
					.status(400)
					.send({ error: "request already exists" });
			}

			//checking to see if the requesting user is already a member of the group
			if (group.members.find((member) => member == request.user)) {
				return response.status(400).send({ error: "already member" });
			}

			//adding the requesting user to the memberJoinRequests array of the group
			group.memberJoinRequests.push(request.user);

			await group.save();

			response.status(201).send({ message: "request sent" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//remove a member from a group
router.patch(
	"/:groupID/remove/:userID",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			//getting the group with the given id
			const group = await Group.findById(request.params.groupID);

			//checking to see if the requesting user is the owner of the group
			if (group.owner != request.user) {
				return response
					.status(400)
					.send({ error: "only owner can remove members" });
			}

			//removing the given id from the members array of the group
			group.members.pull(request.params.userID);

			await group.save();

			response.status(200).send({ message: "member removed" });
		} catch (error) {
			return response.status(500).send({ error: error.message });
		}
	}
);

//middlewares
async function validateGroupID(request, response, next) {
	//checking to see if the group of the given id exists
	const group = await Group.findById(request.params.groupID);

	if (!group) {
		return response.status(400).send({ error: "group does not exist" });
	}

	next();
}

module.exports = router;
