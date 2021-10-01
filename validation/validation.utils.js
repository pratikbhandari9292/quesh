const checkForErrors = (validationResult) => {
	if (validationResult.error) {
		return validationResult.error.details[0].message;
	}

	return null;
};

//to get the message based on whether a field is empty or has minimum characters or has maximum characters
const getErrorMessage = (error, fields) => {
	let errorMessage = "";

	for (let i = 0; i < fields.length; i++) {
		if (error.includes(fields[i].name)) {
			if (error.includes("empty") || error.includes("required")) {
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

module.exports = { checkForErrors, getErrorMessage };
