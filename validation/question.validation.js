const Joi = require("joi");

const { checkForErrors } = require("./validation.utils");

//creating a question validation schema
const questionValidationSchema = Joi.object({
	description: Joi.string().required(),
});

const validateQuestion = (question) => {
	const validationResult = questionValidationSchema.validate(question);
	const error = checkForErrors(validationResult);
	return error;
};

module.exports = { validateQuestion };
