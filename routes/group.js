const express = require("express");
const mongoose = require("mongoose");

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
		owner: request.user,
		members: [{ _id: request.user, addedBy: null }],
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

			//checking to see if the requesting user is a member of the group or the owner of the group
			if (
				!group.members.find((member) => member._id == request.user) &&
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
						(existingMember) => existingMember._id == member
					)
				) {
					return false;
				}

				return true;
			});

			membersToBeAdded.forEach((member) => {
				//adding each of the members to members array of the group
				group.members.push({ _id: member, addedBy: request.user });

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
			if (group.members.find((member) => member._id == request.user)) {
				return response
					.status(400)
					.send({ error: "you already exist in the group" });
			}

			//adding the requesting user to the members array of the group
			group.members.push({ _id: request.user, addedBy: null });

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
					(joinRequest) => joinRequest == request.user
				)
			) {
				return response
					.status(400)
					.send({ error: "request already exists" });
			}

			//checking to see if the requesting user is already a member of the group
			if (group.members.find((member) => member._id == request.user)) {
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
router.delete(
	"/:groupID/remove/:userID",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			//getting the group with the given id
			const group = await Group.findById(request.params.groupID);

			//checking to see of the member to be removed is the owner of the group
			if (
				request.params.userID == group.owner &&
				request.user != group.owner
			) {
				return response
					.status(400)
					.send({ error: "unauthorized to remove this member" });
			}

			//checking to see if the requesting user is the owner of the group or if the requesting user added the member to be removed
			if (
				group.owner == request.user ||
				group.members.find(
					(member) => member._id == request.params.userID
				).addedBy == request.user
			) {
				//removing the given id from the members array of the group
				const newMembers = group.members.filter(
					(member) => member._id != request.params.userID
				);

				group.members = newMembers;

				await group.save();

				return response.status(200).send({ message: "member removed" });
			}

			return response
				.status(400)
				.send({ error: "unauthorized to remove this member" });
		} catch (error) {
			return response.status(500).send({ error: error.message });
		}
	}
);

//leave a group
router.patch(
	"/:groupID/leave",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			const group = await Group.findById(request.params.groupID);

			if (!group.members.find((member) => member._id == request.user)) {
				return response.status(400).send({ error: "not a member" });
			}

			if (request.user == group.owner) {
				return response
					.status(400)
					.send({ error: "owner cannot leave" });
			}

			//removing the requesting user from the members array of the group
			group.members = group.members.filter(
				(member) => member._id != request.user
			);

			await group.save();

			response.send({ message: "left group" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//transfer ownership of the group to another memeber
router.put(
	"/:groupID/delegate-ownership/:userID",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			const group = await Group.findById(request.params.groupID);

			//checking to see if the requesting user is the owner of the group
			if (request.user != group.owner) {
				return response
					.status(400)
					.send({ error: "not authorized to delegate ownership" });
			}

			//checking to see if the new owner exists in the group
			if (
				!group.members.find(
					(member) => member._id == request.params.userID
				)
			) {
				return response.status(400).send({ error: "member not found" });
			}

			//making the user with the given id the new owner of the group
			group.owner = mongoose.Types.ObjectId(request.params.userID);

			await group.save();

			response.status(200).send({ message: "ownership changed" });
		} catch (error) {
			response.status(500).send({ error: error.message });
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
