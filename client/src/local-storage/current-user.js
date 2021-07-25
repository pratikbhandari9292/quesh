const localStorage = window.localStorage;

export const getCurrentUser = () => {
	const currentUser = localStorage.getItem("queshUser");

	if (currentUser) {
		return JSON.parse(currentUser);
	}

	return null;
};

export const setCurrentUser = (currentUser) => {
	localStorage.setItem("queshUser", JSON.stringify(currentUser));
};
