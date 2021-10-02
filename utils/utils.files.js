const getImageError = (error, fileSizeLimit, maxImages) => {
	let errorMessage = error.message;

	if (error.message === "File too large") {
		errorMessage = `max file size is ${fileSizeLimit}MB`;
	}

	if (error.message === "Unexpected field") {
		errorMessage = `only ${maxImages} images can be uploaded`;
	}

	return errorMessage;
};

const setImages = (images, field, fieldID) => {};

module.exports = { getImageError };
