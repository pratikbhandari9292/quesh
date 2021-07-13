const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { checkForErrors } = require("./validation.utils");

//creating a group validation schema
const groupValidationSchema = Joi.object({
	title: Joi.string().required().max(50),
	owner: Joi.objectId,
});

const validateGroup = (group) => {
	const validationResult = groupValidationSchema.validate(group);
	const error = checkForErrors(validationResult);
	return error;
};

module.exports = { validateGroup };
