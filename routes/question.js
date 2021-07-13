const express = require("express");

const auth = require("../middleware/auth");
const { validateQuestion } = require("../validation/question.validation");

const router = express.Router();

//create a new question
router.post("/:groupID", auth, async (request, response) => {
	const questionInfo = request.body;

	//checking to see if the question has any errors
	const error = validateQuestion(questionInfo);

	if (error) {
		return response.status(400).send({ error });
	}
});
