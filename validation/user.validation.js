const Joi = require("joi");

const { checkForErrors, getErrorMessage } = require("./validation.utils");

//defining the fields for registration and login
const fields = [
	{ name: "username", min: 5, max: 25 },
	{ name: "email" },
	{ name: "password", min: 7 },
];

//defining a schema for user registration
const userRegistrationSchema = Joi.object({
	username: Joi.string().min(5).max(25).required(),
	email: Joi.string().required(),
	password: Joi.string().min(7).required(),
});

const validateUserRegistration = (user) => {
	const validationResult = userRegistrationSchema.validate(user);
	const error = checkForErrors(validationResult);

	if (error) {
		return getErrorMessage(error, fields);
	}

	return null;
};

//defining a schema for user login
const userSignInSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(7).required(),
});

const validateUserSignIn = (user) => {
	const validationResult = userSignInSchema.validate(user);
	const error = checkForErrors(validationResult);

	if (error) {
		return getErrorMessage(error, fields);
	}

	return null;
};

//defining a schema for user profile update
const userUpdateSchema = Joi.object({
	username: Joi.string().min(5).max(25).required(),
});

const validateUserUpdate = (user) => {
	const validationResult = userUpdateSchema.validate(user);
	const error = checkForErrors(validationResult);

	if (error) {
		return getErrorMessage(error, fields);
	}

	return null;
};

module.exports = {
	validateUserRegistration,
	validateUserSignIn,
	validateUserUpdate,
};
