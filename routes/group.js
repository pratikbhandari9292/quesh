const express = require("express");
const mongoose = require("mongoose");
const uniqid = require("uniqid");

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

	const joinID = uniqid();

	//creating a new group instance
	const group = new Group({
		...groupInfo,
		owner: request.user,
		createdBy: request.user,
		joinID,
		noOfMembers: 1,
	});

	try {
		//saving the group to the database
		const savedGroup = await group.save();

		//updating the requesting user and making them a member of the group
		await User.findByIdAndUpdate(request.user, {
			$push: {
				groups: {
					_id: String(savedGroup._id),
					addedBy: null,
					joinedAt: Date.now(),
				},
			},
		});

		response.status(201).send({
			group: savedGroup,
		});
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

		response.send({ group });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//get the groups of a user
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
			.populate("owner")
			.populate("memberJoinRequests", {
				_id: 1,
				username: 1,
				email: 1,
				avatar: 1,
			});

		response.send({ groups });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//get the number of members and the number of unsolved questions of a group
router.get(
	"/:groupID/mem-num",
	auth,
	validateGroupID,
	async (request, response) => {
		try {
			const members = await User.find(
				{ "groups._id": request.params.groupID },
				"_id"
			);

			response.send({
				memNum: members.length,
			});
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

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
				Group.findById(request.params.groupID).populate("owner"),
				User.findById(request.user),
			]);

			//checking to see if the requesting user is a member of the group or the owner of the group
			if (
				!requestingUser.groups.find(
					(group) => group._id == request.params.groupID
				) &&
				request.user != group.owner
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
							joinedAt: Date.now(),
						},
					},
				}
			);

			//removing all users from member join requests array
			group.memberJoinRequests = group.memberJoinRequests.filter(
				(request) => !members.find((member) => member == request)
			);

			group.noOfMembers = group.noOfMembers + members.length;

			//saving the group to the database
			const savedGroup = await group.save();

			response.status(201).send({ group: savedGroup });
		} catch (error) {
			console.log(error);
			response.status(500).send({ error: error.message });
		}
	}
);

//join a group
router.post("/join/:joinID", auth, async (request, response) => {
	try {
		//getting the group with the given join id and the requesting user
		const [groups, requestingUser] = await Promise.all([
			Group.find({ joinID: request.params.joinID }),
			User.findById(request.user),
		]);

		const group = groups[0];

		//checking to see if the group exists
		if (!group) {
			return response.status(400).send({ error: "invalid join id" });
		}

		//checking to see if the requesting user is already in the group
		if (
			requestingUser.groups.find(
				(groupInner) => groupInner._id == group._id
			)
		) {
			return response.status(400).send({ error: "already in the group" });
		}

		//updating the user so that they are a member of the group
		requestingUser.groups.push({
			_id: String(group._id),
			addedBy: null,
			joinedAt: Date.now(),
		});

		//removing the requesting user from the memberJoinRequests array of the group
		group.memberJoinRequests = group.memberJoinRequests.filter(
			(requests) => requests != request.member
		);

		//incrementing the number of members in the group
		group.noOfMembers = group.noOfMembers + 1;

		//saving the group and the requesting user to the database
		const [savedGroup, savedUser] = await Promise.all([
			group.save(),
			requestingUser.save(),
		]);

		//getting the updated group
		const updatedGroup = await Group.findById(group._id).populate("owner");

		response.status(201).send({ group: updatedGroup });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

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

//accept or reject a join request
router.patch(
	"/:groupID/request",
	auth,
	validateGroupID,
	async (request, response) => {
		const action = request.query.action;
		const group = request.group;
		const requestUserID = request.query.requestUserID;
		let requestUser = null;

		if (action === "accept") {
			//getting the user that sent the join request
			requestUser = await User.findById(requestUserID);

			if (!requestUser) {
				return response.send({ error: "user not found" });
			}

			if (
				requestUser.groups.find(
					(groupInner) => groupInner._id == group._id
				)
			) {
				return response.send({ error: "already a member" });
			}

			requestUser.groups.push({
				_id: String(group._id),
				addedBy: request.user,
				joinedAt: Date.now(),
			});

			group.noOfMembers = group.noOfMembers + 1;
		}

		group.memberJoinRequests = group.memberJoinRequests.filter(
			(joinRequest) => joinRequest._id != requestUserID
		);

		//saving the user and the group to the database
		const [savedGroup, savedUser] = await Promise.all([
			group.save(),
			requestUser ? requestUser.save() : null,
		]);

		response.send({ group: savedGroup });
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
				Group.findById(request.params.groupID).populate("owner"),
				User.findById(request.params.userID),
			]);

			if (!member) {
				return response.status(400).send({ error: "member not found" });
			}

			//checking to see of the member to be removed is the owner of the group
			if (
				request.params.userID == group.owner._id &&
				request.user != group.owner._id
			) {
				return response.status(400).send({ error: "unauthorized" });
			}

			//checking to see if the requesting user is the owner of the group or if the requesting user added the member to be removed
			if (
				group.owner._id == request.user ||
				member.groups.find(
					(group) => group._id == request.params.groupID
				).addedBy == request.user
			) {
				//updating the member so that they are not a member of the group
				member.groups = member.groups.filter(
					(group) => group._id != request.params.groupID
				);

				//decrementing the number of members of the group
				group.noOfMembers = group.noOfMembers - 1;

				//saving the user and the group to the database
				const [savedMember, savedGroup] = await Promise.all([
					member.save(),
					group.save(),
				]);

				return response.status(200).send({ group: savedGroup });
			}

			return response.status(400).send({ error: "unauthorized" });
		} catch (error) {
			console.log(error);
			return response.status(500).send({ error: error.message });
		}
	}
);

//leave a group
router.delete(
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

			//decrementing the number of members of the group
			group.noOfMembers = group.noOfMembers - 1;

			//saving the group and the requesting user to the database
			await Promise.all([group.save(), requestingUser.save()]);

			response.send({ message: "left group" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//transfer ownership of the group to another member
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

			response.status(200).send({ owner: newOwner });
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
		const sortBy = request.query.sortBy;
		const order = sortBy === "createdAt" ? "asc" : "desc";

		try {
			//getting the questions belonging to the group of the given id
			const questions = await Question.find({
				group: request.params.groupID,
			})
				.populate([
					{
						path: "author",
					},
					{
						path: "solution",
						populate: {
							path: "author",
						},
					},
					{
						path: "proposedSolutions",
						populate: {
							path: "author",
						},
					},
				])
				.sort({ [sortBy]: order });

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

			response.send({ members });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//search for groups
router.get("/search/:searchTerm", auth, async (request, response) => {
	const searchRegularExpression = new RegExp(request.params.searchTerm, "i");

	try {
		const groups = await Group.find({
			$or: [
				{ title: { $regex: searchRegularExpression } },
				{ about: { $regex: searchRegularExpression } },
			],
		}).populate("owner");

		response.send({ groups });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//middlewares
async function validateGroupID(request, response, next) {
	//checking to see if the group of the given id exists
	const group = await Group.findById(request.params.groupID)
		.populate("owner")
		.populate("memberJoinRequests", {
			_id: 1,
			username: 1,
			email: 1,
			avatar: 1,
		});

	if (!group) {
		return response.status(400).send({ error: "group does not exist" });
	}

	request.group = group;

	next();
}

module.exports = router;
