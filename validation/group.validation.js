const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { checkForErrors, getErrorMessage } = require("./validation.utils");

const fields = [
	{ name: "title", max: 50 },
	{ name: "description", min: 25 },
];

//creating a group validation schema
const groupValidationSchema = Joi.object({
	title: Joi.string().required().max(50),
	description: Joi.string().required().min(25),
	owner: Joi.objectId,
});

const validateGroup = (group) => {
	const validationResult = groupValidationSchema.validate(group);
	const error = checkForErrors(validationResult);

	if (error) {
		return getErrorMessage(error, fields);
	}

	return null;
};

module.exports = { validateGroup };
