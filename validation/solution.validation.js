const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { checkForErrors, getErrorMessage } = require("./validation.utils");

//defining the fields for a solution
const fields = [{ name: "description", max: 250 }];

//creating a validation schema for solution
const solutionValidationSchema = Joi.object({
	description: Joi.string().required().max(250),
	question: Joi.objectId,
});

const validateSolution = (solution) => {
	const validationResult = solutionValidationSchema.validate(solution);
	const error = checkForErrors(validationResult);

	if (error) {
		return getErrorMessage(error, fields);
	}
};

module.exports = { validateSolution };
