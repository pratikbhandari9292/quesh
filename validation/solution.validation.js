const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { checkForErrors } = require("./validation.utils");

//creating a validation schema for solution
const solutionValidationSchema = Joi.object({
	description: Joi.string().required(),
	question: Joi.objectId,
});

const validateSolution = (solution) => {
	const validationResult = solutionValidationSchema.validate(solution);
	const error = checkForErrors(validationResult);
	return error;
};

module.exports = { validateSolution };
