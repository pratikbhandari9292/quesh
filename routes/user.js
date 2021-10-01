const express = require("express");
const uniqid = require("uniqid");

const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Group = require("../models/Group");
const { getUpload } = require("../middleware/multer");
const Image = require("../models/Image");
const { validateUserUpdate } = require("../validation/user.validation");

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
	const searchRegularExpression = new RegExp(
		request.params.searchTerm.trim(),
		"i"
	);

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

//update user profile
const fileSizeLimit = 5;
const upload = getUpload(fileSizeLimit);

router.patch(
	"/update/:userID",
	auth,
	upload.single("avatar"),
	async (request, response) => {
		const updateInfo = request.body;
		const userID = request.params.userID;
		let image = null;
		let savedImage = null;
		let imageOption = {};

		const error = validateUserUpdate({ username: updateInfo.username });

		if (error) {
			return response.status(400).send({ error });
		}

		if (request.user != userID) {
			return response.status(400).send({ error: "unauthorized" });
		}

		if (request.file) {
			image = await Image.findOne({ user: userID });

			if (image) {
				image.binary = request.file.buffer;
			} else {
				image = new Image({
					binary: request.file.buffer,
					user: userID,
				});
			}

			savedImage = await image.save();

			const randomString = uniqid();
			imageOption = {
				avatar: `/api/image/${randomString}?userID=${userID}`,
			};
		}

		const user = await User.findByIdAndUpdate(
			userID,
			{
				username: updateInfo.username,
				...imageOption,
			},
			{ new: true }
		);

		response.send({ user });
	},
	(error, request, response, next) => {
		let errorMessage = error.message;

		if (error.message === "File too large") {
			errorMessage = `max file size is ${fileSizeLimit}MB`;
		}

		response.status(400).send({ error: errorMessage });
	}
);

//remove avatar
router.delete("/avatar/:userID", auth, async (request, response) => {
	if (request.user != request.params.userID) {
		return response.status(400).send({ error: "not authorized" });
	}

	const user = await User.findById(request.params.userID);

	if (!user) {
		return response.status(400).send({ error: "user not found" });
	}

	user.avatar = `https://avatars.dicebear.com/api/initials/${user.username}.svg`;

	try {
		const savedUser = await user.save();

		response.send({ user: savedUser });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

module.exports = router;
