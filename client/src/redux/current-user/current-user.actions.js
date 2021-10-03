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

export const setActiveUser = (user) => {
	return {
		type: "SET_ACTIVE_USER",
		payload: user,
	};
};

export const resetCurrentUser = () => {
	return {
		type: "RESET_CURRENT_USER",
	};
};
