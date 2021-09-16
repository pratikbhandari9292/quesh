const express = require("express");

const { auth } = require("../middleware/auth");
const { validateQuestion } = require("../validation/question.validation");
const Group = require("../models/Group");
const Question = require("../models/Question");
const User = require("../models/User");

const router = express.Router();

//create a new question
router.post("/:groupID", auth, async (request, response) => {
	const questionInfo = request.body;

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
			author: request.user,
			group: request.params.groupID,
		});

		//saving the question to the database
		const [savedQuestion, requestingUser] = await Promise.all([
			question.save(),
			User.findById(request.user),
		]);

		const {
			_id,
			description,
			title,
			group,
			image,
			solution,
			createdAt,
			updatedAt,
			votes,
		} = savedQuestion;

		response.status(201).send({
			question: {
				_id,
				description,
				title,
				group,
				image,
				solution,
				createdAt,
				updatedAt,
				votes,
				author: requestingUser,
			},
		});
	} catch (error) {
		console.log(error);
		response.status(500).send({ error: error.message });
	}
});

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
		console.log(error);
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
