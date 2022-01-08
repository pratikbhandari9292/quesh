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
const { questionPopulate } = require("../utils/utils.populate");
const { sendNewQuestionEmail } = require("../emails/account");
const Solution = require("../models/Solution");

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
            const [questionGroup, requestingUser] = await Promise.all([
                Group.findById(request.params.groupID).populate("owner"),
                User.findById(request.user),
            ]);

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
                    const src = `/api/image/${randomString}/?questionID=${questionID}`;

                    images = [
                        ...images,
                        new Image({
                            binary: file.buffer,
                            question: questionID,
                            randomStr: randomString,
                            src,
                        }),
                    ];

                    question.images = [...question.images, src];
                });
            }

            //saving the question and images to the database
            const [savedQuestion, savedImages] = await Promise.all([
                question.save(),
                Image.insertMany(images),
            ]);

            sendNewQuestionEmail(
                questionGroup.title,
                requestingUser.username,
                questionGroup.owner.email
            );

            response.status(201).send({
                question: savedQuestion,
                author: requestingUser,
                group: questionGroup,
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
        question = await Question.findById(request.params.questionID)
            .populate({
                path: "group",
                select: ["_id", "owner"],
            })
            .populate({
                path: "author",
                select: ["username", "_id", "avatar"],
            })
            .populate("solution");
        response.send({ question });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

//update a question
router.patch("/:questionID", auth, questionAuth, async (request, response) => {
    const updateInfo = request.body;

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            request.params.questionID,
            updateInfo,
            { new: true }
        );

        response.send({ question: updatedQuestion });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

//get the questions asked by a user
router.get("/user/:userID", auth, async (request, response) => {
    try {
        const questions = await Question.find({
            author: request.params.userID,
        }).populate(questionPopulate);

        response.send({ questions });
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
    const userID = request.query.userID;
    const questionFilter = groupID
        ? { ["group"]: groupID }
        : userID
        ? { ["author"]: userID }
        : {};

    try {
        const questions = await Question.find({
            $or: [
                { title: { $regex: searchTermRegularExpression } },
                { description: { $regex: searchTermRegularExpression } },
            ],
            ...questionFilter,
        }).populate(questionPopulate);

        response.send({ questions });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

//delete a question
router.delete("/:questionID", auth, questionAuth, async (request, response) => {
    const question = request.question;
    const requestingUser = request.user;

    if (question.author != requestingUser && question.group.owner != requestingUser) {
        return response.status(400).send({ error: "not authorized" });
    }

    try {
        await Promise.all([
            Question.findByIdAndDelete(request.params.questionID),
            Solution.deleteMany({ question: request.params.questionID }),
            Image.deleteMany({ question: request.params.questionID }),
        ]);

        response.send({ message: "deleted" });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

//middlewares
async function questionAuth(request, response, next) {
    const question = await Question.findById(request.params.questionID).populate("group");

    if (!question) {
        return response.send({ error: "question not found" });
    }

    request.question = question;

    next();
}

module.exports = router;
