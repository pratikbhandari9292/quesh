export const selectUser = (user) => {
	return {
		type: "SELECT_USER",
		payload: user,
	};
};

export const unselectUser = (userID) => {
	return {
		type: "UNSELECT_USER",
		payload: userID,
	};
};

export const clearSelectedUsers = () => {
	return {
		type: "CLEAR_SELECTED_USERS",
	};
};

export const setSearchTerm = (searchTerm) => {
	return {
		type: "SET_SEARCH_TERM",
		payload: searchTerm,
	};
};

export const setSearchedUsers = (searchedUsers) => {
	return {
		type: "SET_SEARCHED_USERS",
		payload: searchedUsers,
	};
};

export const setShowUsers = (showUsers) => {
	return {
		type: "SET_SHOW_USERS",
		payload: showUsers,
	};
};

export const resetAddMembers = () => {
	return (dispatch) => {
		dispatch(clearSelectedUsers());
		dispatch(setSearchedUsers([]));
		dispatch(setSearchTerm(""));
		dispatch(setShowUsers(false));
	};
};
