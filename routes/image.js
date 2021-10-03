const express = require("express");

const Image = require("../models/Image");
const { auth } = require("../middleware/auth");
const Question = require("../models/Question");
const Solution = require("../models/Solution");
const User = require("../models/User");

const router = express.Router();

//get an image
router.get("/:randomString", async (request, response) => {
	let options = null;

	const userID = request.query.userID;
	const questionID = request.query.questionID;
	const solutionID = request.query.solutionID;

	if (userID) {
		options = { user: userID };
	}

	if (questionID) {
		options = {
			question: questionID,
			randomStr: request.params.randomString,
		};
	}

	if (solutionID) {
		options = {
			solution: solutionID,
			randomStr: request.params.randomString,
		};
	}

	try {
		const image = await Image.findOne(options);

		if (!image) {
			return response.status(400).send({ error: "image not found" });
		}

		response.set("Content-Type", "image/jpg");

		response.send(image.binary);
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//delete an image
router.delete("/:contentID", auth, async (request, response) => {
	const contentID = request.params.contentID;
	const contentType = request.query.type;
	const src = request.query.src;
	let content = null;

	if (contentType === "question") {
		content = await Question.findById(contentID);
	}

	if (contentType === "solution") {
		content = await Solution.findById(contentID);
	}

	if (contentType === "user") {
		content = await User.findById(contentID);
		content.avatar = `https://avatars.dicebear.com/api/initials/${content.username}.svg`;
	}

	try {
		const [deletedImage, savedContent] = await Promise.all([
			Image.findOneAndDelete({ src }),
			content.save(),
		]);

		const dataToSend =
			contentType === "user"
				? { user: savedContent }
				: { images: savedContent.images };

		response.send(dataToSend);
	} catch (error) {
		console.log(error);
		response.status(500).send({ error: error.message });
	}
});

module.exports = router;
