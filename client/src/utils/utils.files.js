export const setFilesErrorExternal = (error, setter) => {
	if (
		error.includes("supported") ||
		error.includes("MB") ||
		error.includes("uploaded")
	) {
		setter(error);
	}
};
