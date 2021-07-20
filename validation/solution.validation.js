const Joi = require("joi");

const { checkForErrors } = require("./validation.utils");

//creating a validation schema for solution
const solutionValidationSchema = Joi.object({
	description: Joi.string().required(),
});

const validateSolution = (solution) => {
	const validationResult = solutionValidationSchema.validate(solution);
	const error = checkForErrors(validationResult);
	return error;
};

module.exports = { validateSolution };
