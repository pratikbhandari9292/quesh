const express = require("express");
const mongoose = require("mongoose");

const { auth } = require("../middleware/auth");
const { validateGroup } = require("../validation/group.validation");
const Group = require("../models/Group");
const Question = require("../models/Question");
const User = require("../models/User");

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
	});

	try {
		//saving the group to the database
		const savedGroup = await group.save();

		//updating the requesting user and making them a member of the group
		await User.findByIdAndUpdate(request.user, {
			$push: {
				groups: { _id: savedGroup._id, addedBy: null, role: "owner" },
			},
		});

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
			//getting the group with the given id and the requesting user
			const [group, requestingUser] = await Promise.all([
				Group.findById(request.params.groupID),
				User.findById(request.user),
			]);

			//checking to see if the requesting user is a member of the group or the owner of the group
			if (
				!requestingUser.groups.find(
					(group) => group._id == request.params.groupID
				) &&
				request.user != group.member
			) {
				return response
					.status(400)
					.send({ error: "unauthorized to add users" });
			}

			//updating the given users and adding a new group to the groups array
			await User.updateMany(
				{
					_id: { $in: members },
					"groups._id": { $nin: [request.params.groupID] },
				},
				{
					$push: {
						groups: {
							_id: request.params.groupID,
							addedBy: request.user,
							role: "member",
						},
					},
				}
			);

			//removing all users from member join requests array
			group.memberJoinRequests = group.memberJoinRequests.filter(
				(request) => !members.find((member) => member == request)
			);

			//saving the group to the database
			await group.save();

			// //filtering out the members that already exist
			// const membersToBeAdded = members.filter((member) => {
			// 	if (
			// 		group.members.find(
			// 			(existingMember) => existingMember._id == member
			// 		)
			// 	) {
			// 		return false;
			// 	}

			// 	return true;
			// });

			// membersToBeAdded.forEach((member) => {
			// 	//adding each of the members to members array of the group
			// 	group.members.push({ _id: member, addedBy: request.user });

			// 	//removing each of the members from memberJoinRequests array of the group
			// 	group.memberJoinRequests.pull({ _id: member });
			// });

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
			//getting the group with the given id and the requesting user
			const [group, requestingUser] = await Promise.all([
				Group.findById(request.params.groupID),
				User.findById(request.user),
			]);

			//checking to see if the requesting user is already in the group
			if (
				requestingUser.groups.find(
					(group) => group._id == request.params.groupID
				)
			) {
				return response
					.status(400)
					.send({ error: "already in the group" });
			}

			//updating the user so that they are a member of the group
			requestingUser.groups.push({
				_id: request.params.groupID,
				addedBy: null,
				role: "member",
			});

			//removing the requesting user from the memberJoinRequests array of the group
			group.memberJoinRequests = group.memberJoinRequests.filter(
				(requests) => requests != request.member
			);

			//saving the group and the requesting user to the database
			await Promise.all([group.save(), requestingUser.save()]);

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
			//getting the group of the provided id and the requesting user
			const [group, requestingUser] = await Promise.all([
				Group.findById(request.params.groupID),
				User.findById(request.user),
			]);

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
			if (
				requestingUser.groups.find(
					(group) => group._id == request.params.groupID
				)
			) {
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
			//getting the group with the given id and the member to be removed
			const [group, member] = await Promise.all([
				Group.findById(request.params.groupID),
				User.findById(request.params.userID),
			]);

			if (!member) {
				return response.status(400).send({ error: "member not found" });
			}

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
				member.groups
					.find((group) => group._id == request.params.groupID)
					.addedBy(request.user)
			) {
				//updating the member so that they are not a member of the group
				member.groups = member.groups.filter(
					(group) => group._id != request.params.groupID
				);

				//saving the user to the database
				await member.save();

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
			//getting the group of the given id and the requesting user
			const [group, requestingUser] = await Promise.all([
				Group.findById(request.params.groupID),
				User.findById(request.user),
			]);

			//checking to see of the requesting user is a member of the group
			if (
				!requestingUser.groups.find(
					(group) => group._id == request.params.groupID
				)
			) {
				return response.status(400).send({ error: "not a member" });
			}

			if (request.user == group.owner) {
				return response
					.status(400)
					.send({ error: "owner cannot leave" });
			}

			//updating the user so that they are not a member of the group
			requestingUser.groups = requestingUser.groups.filter(
				(group) => group._id != request.params.groupID
			);

			//saving the group and the requesting user to the database
			await Promise.all([group.save(), requestingUser.save()]);

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
			//getting the group of the given id and the new owner
			const [group, newOwner] = await Promise.all([
				Group.findById(request.params.groupID),
				User.findById(request.params.userID),
			]);

			//checking to see if the requesting user is the owner of the group
			if (request.user != group.owner) {
				return response
					.status(400)
					.send({ error: "not authorized to delegate ownership" });
			}

			//checking to see if the new owner exists in the group
			if (
				!newOwner.groups.find(
					(group) => group._id == request.params.groupID
				)
			) {
				return response.status(400).send({ error: "member not found" });
			}

			//making the user with the given id the new owner of the group
			group.owner = mongoose.Types.ObjectId(request.params.userID);

			//saving the group to the database
			await group.save();

			response.status(200).send({ message: "ownership changed" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//get all the questions of a group
router.get(
	"/:groupID/questions",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			//getting the questions belonging to the group of the given id
			const questions = await Question.find({
				group: request.params.groupID,
			});

			response.status(200).send({ questions });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//get all the members of a group
router.get(
	"/:groupID/members",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			//getting all the users whose groups array contains the group of the given id
			const members = await User.find({
				"groups._id": request.params.groupID,
			});

			response.status(200).send({ members });
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