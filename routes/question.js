const express = require("express");

const { auth } = require("../middleware/auth");
const { validateQuestion } = require("../validation/question.validation");
const Group = require("../models/Group");
const Question = require("../models/Question");

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
		const group = await Group.findById(request.params.groupID);

		if (!group) {
			return response.status(400).send({ error: "group not found" });
		}

		const question = new Question({
			...questionInfo,
			author: request.user,
			group: request.params.groupID,
		});

		//saving the question to the database
		const savedQuestion = await question.save();

		response.status(201).send({ message: "question created" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});
module.exports = router;
