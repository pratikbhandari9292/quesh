const Joi = require("joi");

const { checkForErrors, getErrorMessage } = require("./validation.utils");

//defining the fields for question
const fields = [{ name: "description" }];

//creating a question validation schema
const questionValidationSchema = Joi.object({
	description: Joi.string().required(),
});

const validateQuestion = (question) => {
	const validationResult = questionValidationSchema.validate(question);
	const error = checkForErrors(validationResult);

	if (error) {
		return getErrorMessage(error, fields);
	}

	return null;
};

module.exports = { validateQuestion };
