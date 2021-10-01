export const selectFiles = (files) => {
	return {
		type: "SELECT_FILES",
		payload: files,
	};
};

export const unselectFile = (name) => {
	return {
		type: "UNSELECT_FILE",
		payload: name,
	};
};

export const resetFiles = () => {
	return {
		type: "RESET_FILES",
	};
};
