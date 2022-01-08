const express = require("express");
const mongoose = require("mongoose");
const uniqid = require("uniqid");

const { auth } = require("../middleware/auth");
const Question = require("../models/Question.js");
const { validateSolution } = require("../validation/solution.validation");
const Group = require("../models/Group");
const Solution = require("../models/Solution");
const { getUpload } = require("../middleware/multer");
const { getImageError } = require("../utils/utils.files");
const Image = require("../models/Image");
const User = require("../models/User");
const { questionPopulate } = require("../utils/utils.populate");
const { sendQuestionSolvedEmail } = require("../emails/account");

const router = express.Router();

//submit a solution to a question
const maxImages = 5;
const upload = getUpload();

router.post(
	"/:questionID",
	auth,
	upload.array("uploads", maxImages),
	questionAuth,
	async (request, response) => {
		const solutionInfo = request.body;
		const question = request.question;
		const solutionID = new mongoose.Types.ObjectId();
		const type = request.query.type;
		let images = [];

		//checking to see if the solution has any errors
		const error = validateSolution(solutionInfo);

		if (error) {
			return response.status(400).send({ error });
		}

		try {
			//getting the group the question belongs to and the requesting user
			const [group, requestingUser] = await Promise.all([
				Group.findById(question.group),
				User.findById(request.user),
			]);

			//checking to see if the requesting user is the owner of the group
			if (
				(type === "solve" && request.user != group.owner) ||
				(type === "propose" && request.user == group.owner)
			) {
				return response.status(400).send({ error: "not authorized" });
			}

			const solution = new Solution({
				...solutionInfo,
				_id: solutionID,
				author: request.user,
				approved: type === "solve" ? true : false,
				question: request.params.questionID,
			});

			if (request.files.length > 0) {
				request.files.forEach((file) => {
					const randomString = uniqid();
					const src = `/api/image/${randomString}/?solutionID=${solutionID}`;

					images = [
						...images,
						new Image({
							binary: file.buffer,
							solution: solutionID,
							randomStr: randomString,
							src,
						}),
					];

					solution.images = [...solution.images, src];
				});
			}

			if (type === "solve") {
				question.solution = solutionID;
				question.solved = true;
			}

			if (type === "propose") {
				question.proposedSolutions = [
					...question.proposedSolutions,
					solutionID,
				];
			}

			//saving the solution, question and images to the database
			const [savedSolution, savedQuestion, savedImages] =
				await Promise.all([
					solution.save(),
					question.save(),
					Image.insertMany(images),
				]);

			if (type === "solve") {
				sendQuestionSolvedEmail(
					group.title,
					question.title,
					requestingUser.username,
					question.author.email
				);
			}

			response
				.status(201)
				.send({ solution: savedSolution, author: requestingUser });
		} catch (error) {
			console.log(error);
			response.status(500).send({ error: error.message });
		}
	},
	(error, request, response, next) => {
		response
			.status(400)
			.send({ error: getImageError(error, 5, maxImages) });
	}
);

//update a solution
router.patch("/:solutionID", auth, solutionAuth, async (request, response) => {
	const solutionInfo = request.body;
	const author = request.solution.author;
	const group = request.solution.question.group;

	const error = validateSolution(solutionInfo);

	if (error) {
		return response.status(400).send({ error });
	}

	if (!(request.user == author._id || request.user == group.owner)) {
		return response.status(400).send({ error: "not authorized" });
	}

	try {
		const savedSolution = await Solution.findByIdAndUpdate(
			request.params.solutionID,
			solutionInfo,
			{ new: true }
		);

		response.send({ solution: savedSolution });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//approve a solution
router.put(
	"/approve/:solutionID",
	auth,
	solutionAuth,
	async (request, response) => {
		const solution = request.solution;
		const question = solution.question;
		const group = question.group;

		try {
			//checking to see if the requesting user is the owner of the group
			if (request.user != group.owner) {
				return response.status(400).send({ error: "not authorized" });
			}

			//making the existing solution a proposed solution
			if (question.solution) {
				question.proposedSolutions = [
					...question.proposedSolutions,
					question.solution._id,
				];
			}

			question.solution = request.params.solutionID;
			question.solved = true;

			question.proposedSolutions = question.proposedSolutions.filter(
				(proposedSolution) =>
					proposedSolution != request.params.solutionID
			);

			//updating the solution to be approved
			solution.approved = true;

			//saving the question and the solution to the database
			const [savedQuestion, savedSolution] = await Promise.all([
				question.save(),
				solution.save(),
			]);

			const populatedQuestion = await Question.findById(
				question._id
			).populate(questionPopulate);

			response.send({
				solution: populatedQuestion.solution,
				proposedSolutions: populatedQuestion.proposedSolutions,
			});
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
			}).populate("author").populate("question");

			response.send({ solutions: proposedSolutions });
		} catch (error) {
			response.status(500).send({ error: error.message });
		}
	}
);

//delete a solution
router.delete("/:solutionID", auth, solutionAuth, async (request, response) => {
	const type = request.query.type;
	const solution = request.solution;
	const group = solution.question.group;

	if (!(request.user == solution.author || request.user == group.owner)) {
		return response.status(400).send({ error: "not authorized" });
	}

	try {
		const [question] = await Promise.all([
			Question.findById(solution.question._id),
			Solution.findByIdAndDelete(request.params.solutionID),
			Image.deleteMany({ solution: request.params.solutionID }),
		]);

		if (type === "solution") {
			question.solution = null;
			question.solved = false;
		}

		if (type === "proposal") {
			question.proposedSolutions = question.proposedSolutions.filter(
				(proposedSolution) =>
					proposedSolution != request.params.solutionID
			);
		}

		await question.save();

		response.send({ message: "deleted" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//middlewares
async function questionAuth(request, response, next) {
	try {
		//getting the question with the given id
		const question = await Question.findById(
			request.params.questionID
		).populate("author");

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

async function solutionAuth(request, response, next) {
	try {
		const solution = await Solution.findById(
			request.params.solutionID
		).populate([
			{
				path: "question",
				populate: [
					{
						path: "group",
					},
				],
			},
			{
				path: "author",
			},
		]);

		if (!solution) {
			return response.status(400).send({ error: "solution not found" });
		}

		request.solution = solution;

		next();
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
}

module.exports = router;
