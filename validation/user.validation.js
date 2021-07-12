const Joi = require("joi");

const { checkForErrors } = require("./validation.utils");

//defining a schema for user registration
const userRegistrationSchema = Joi.object({
	username: Joi.string().min(5).max(25).required(),
	email: Joi.string().required(),
	password: Joi.string().min(7).required(),
});

const validateUserRegistration = (user) => {
	const validationResult = userRegistrationSchema.validate(user);
	const error = checkForErrors(validationResult);
	return error;
};

//defining a schema for user login
const userLoginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(7).required(),
});

const validateUserLogin = (user) => {
	const validationResult = userLoginSchema.validate(user);
	const error = checkForErrors(validationResult);
	return error;
};

module.exports = { validateUserRegistration, validateUserLogin };
