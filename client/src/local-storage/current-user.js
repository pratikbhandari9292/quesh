const localStorage = window.localStorage;

export const addUserGroup = (group) => {
	const currentUser = getCurrentUser();

	setCurrentUser({
		...currentUser,
		groups: [...currentUser.groups, group],
	});
};

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

export const updateCurrentUser = (updateInfo) => {
	const currentUser = getCurrentUser();
	setCurrentUser({ ...currentUser, ...updateInfo });
};
