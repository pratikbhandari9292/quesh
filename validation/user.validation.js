const Joi = require("joi");

const { checkForErrors } = require("./validation.utils");

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

//to get the message based on whether a field is empty or has minimum characters or has maximum characters
const getErrorMessage = (error, fields) => {
	let errorMessage = "";

	for (let i = 0; i < fields.length; i++) {
		if (error.includes(fields[i].name)) {
			if (error.includes("empty")) {
				errorMessage = `${fields[i].name} cannot be empty`;
				break;
			}

			if (error.includes("at least")) {
				errorMessage = `${fields[i].name} must be atleast ${fields[i].min} characters`;
				break;
			}

			errorMessage = `${fields[i].name} cannot be more than ${fields[i].max} characters`;
			break;
		}
	}

	return errorMessage;
};

module.exports = { validateUserRegistration, validateUserSignIn };
