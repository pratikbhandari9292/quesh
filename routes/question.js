const express = require("express");
const uniqid = require("uniqid");
const mongoose = require("mongoose");

const { auth } = require("../middleware/auth");
const { validateQuestion } = require("../validation/question.validation");
const Group = require("../models/Group");
const Question = require("../models/Question");
const User = require("../models/User");
const { getUpload } = require("../middleware/multer");
const Image = require("../models/Image");
const { getImageError } = require("../utils/utils.files");

const router = express.Router();

//create a new question
const maxImages = 3;
const upload = getUpload();

router.post(
	"/:groupID",
	auth,
	upload.array("uploads", maxImages),
	async (request, response) => {
		const questionInfo = request.body;
		let images = [];
		const questionID = new mongoose.Types.ObjectId();

		//checking to see if the question has any errors
		const error = validateQuestion(questionInfo);

		if (error) {
			return response.status(400).send({ error });
		}

		try {
			//getting the group of the given id
			const questionGroup = await Group.findById(request.params.groupID);

			if (!questionGroup) {
				return response.status(400).send({ error: "group not found" });
			}

			const question = new Question({
				...questionInfo,
				_id: questionID,
				author: request.user,
				group: request.params.groupID,
				images: [],
			});

			if (request.files.length > 0) {
				request.files.forEach((file) => {
					const randomString = uniqid();

					images = [
						...images,
						new Image({
							binary: file.buffer,
							question: questionID,
							randomStr: randomString,
						}),
					];

					question.images = [
						...question.images,
						`/api/image/${randomString}/?questionID=${questionID}`,
					];
				});
			}

			//saving the question and images to the database
			const [savedQuestion, savedImages, requestingUser] =
				await Promise.all([
					question.save(),
					Image.insertMany(images),
					User.findById(request.user),
				]);

			response.status(201).send({
				question: savedQuestion,
				author: requestingUser,
			});
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	},
	(error, request, response, next) => {
		response
			.status(400)
			.send({ error: getImageError(error, 5, maxImages) });
	}
);

//get the details of a question
router.get("/:questionID", auth, questionAuth, async (request, response) => {
	try {
		response.send({ question });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//delete a question
router.delete("/:questionID", auth, questionAuth, async (request, response) => {
	try {
		await Question.findByIdAndDelete(request.params.questionID);

		response.send({ message: "deleted" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//update a question
router.patch("/:questionID", auth, questionAuth, async (request, response) => {
	const updateInfo = request.body;

	try {
		await Question.findByIdAndUpdate(request.params.questionID, updateInfo);

		response.send({ message: "updated" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//search question
router.get("/search/:searchTerm", auth, async (request, response) => {
	const searchTermRegularExpression = new RegExp(
		request.params.searchTerm,
		"i"
	);

	const groupID = request.query.groupID;

	const groupFilter = groupID ? { ["group"]: groupID } : {};

	try {
		const questions = await Question.find({
			$or: [
				{ title: { $regex: searchTermRegularExpression } },
				{ description: { $regex: searchTermRegularExpression } },
			],
			...groupFilter,
		}).populate("author");

		response.send({ questions });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//delete a question
router.delete("/:questionID", auth, questionAuth, async (request, response) => {
	const question = request.question;
	const requestingUser = request.user;

	if (question.author != requestingUser) {
		return response.status(400).send({ error: "not authorized" });
	}

	try {
		await Question.findByIdAndDelete(request.params.questionID);

		response.send({ message: "deleted" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//middlewares
async function questionAuth(request, response, next) {
	const question = await Question.findById(request.params.questionID);

	if (!question) {
		return response.send({ error: "question not found" });
	}

	request.question = question;

	next();
}

module.exports = router;
