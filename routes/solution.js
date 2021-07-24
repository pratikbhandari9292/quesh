const express = require("express");

const { auth } = require("../middleware/auth");
const Question = require("../models/Question.js");
const { validateSolution } = require("../validation/solution.validation");
const Group = require("../models/Group");
const Solution = require("../models/Solution");

const router = express.Router();

//submit a solution to a question
router.post("/:questionID", auth, questionAuth, async (request, response) => {
	const solutionInfo = request.body;
	const question = request.question;

	//checking to see if the solution has any errors
	const error = validateSolution(solutionInfo);

	if (error) {
		return response.status(400).send({ error });
	}

	try {
		//getting the group the question belongs to
		const group = await Group.findById(question.group);

		//checking to see if the requesting user is the owner of the group
		if (request.user != group.owner) {
			return response
				.status(400)
				.send({ error: "not authorized to submit solution" });
		}

		//deleting the existing solution
		await Solution.findByIdAndDelete(question.solution);

		const solution = new Solution({
			...solutionInfo,
			author: request.user,
			approved: true,
			question: request.params.questionID,
		});

		//saving the solution to the database
		const savedSolution = await solution.save();

		question.solution = savedSolution._id;

		//saving the question to the database
		await question.save();

		response.status(201).send({ message: "solution submitted" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//propose a solution
router.post(
	"/:questionID/propose",
	auth,
	questionAuth,
	async (request, response) => {
		const solutionInfo = request.body;
		const question = request.question;

		//checking to see if the solution has any errors
		const error = validateSolution(solutionInfo);

		if (error) {
			return response.status(400).send({ error });
		}

		try {
			//getting the group the question belongs to
			const group = await Group.findById(question.group);

			//checking to see if the requesting user if a member of the group
			if (!group.members.find((member) => member._id == request.user)) {
				return response
					.status(400)
					.send({ error: "unauthorized to propose a solution" });
			}

			const solution = new Solution({
				...solutionInfo,
				author: request.user,
				approved: false,
				question: request.params.questionID,
			});

			//saving the solution to the database
			const savedSolution = await solution.save();

			response.status(201).send({ message: "solution proposed" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//approve a solution
router.put(
	"/:questionID/approve/:solutionID",
	auth,
	questionAuth,
	async (request, response) => {
		const question = request.question;

		try {
			//getting the group the question belongs to
			const group = await Group.findById(question.group);

			//checking to see if the requesting user is the owner of the group
			if (request.user != group.owner) {
				return response
					.status(400)
					.send({ error: "not authorized to approve solution" });
			}

			//checking to see if the solution to the given id exists
			const solution = await Solution.findById(request.params.solutionID);

			if (!solution) {
				return response
					.status(400)
					.send({ error: "solution not found" });
			}

			//deleting the existing solution of the question
			if (question.solution) {
				await Solution.findByIdAndDelete(question.solution);
			}

			question.solution = request.params.solutionID;

			//updating the solution to be approved
			solution.approved = true;

			//saving the question and the solution to the database
			await Promise.all([question.save(), solution.save()]);

			response.send({ message: "solution approved" });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//get all the proposed solutions of a question
router.get(
	"/proposed/:questionID",
	auth,
	questionAuth,
	async (request, response) => {
		const question = request.question;

		try {
			//getting all the solutions whose question is of the given id and not approved
			const proposedSolutions = await Solution.find({
				question: request.params.questionID,
				approved: false,
			});

			response.send({ proposedSolutions });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//middlewares
async function questionAuth(request, response, next) {
	try {
		//getting the question with the given id
		const question = await Question.findById(request.params.questionID);

		//checking to see if the question exists
		if (!question) {
			return response.status(400).send({ error: "question not found" });
		}

		request.question = question;

		next();
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
}

module.exports = router;
