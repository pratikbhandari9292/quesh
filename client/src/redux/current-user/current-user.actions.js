export const setCurrentUser = (currentUser) => {
	return {
		type: "SET_CURRENT_USER",
		payload: currentUser,
	};
};

export const incrementUserUpdates = () => {
	return {
		type: "INCREMENT_USER_UPDATES",
	};
};

export const resetCurrentUser = () => {
	return {
		type: "RESET_CURRENT_USER",
	};
};
