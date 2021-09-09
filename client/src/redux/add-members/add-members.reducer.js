const INITIAL_STATE = {
	selectedUsers: [],
	searchTerm: "",
	searchedUsers: [],
	showUsers: false,
};

export const addMembersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SELECT_USER":
			return {
				...state,
				selectedUsers: [...state.selectedUsers, action.payload],
			};
		case "UNSELECT_USER":
			return {
				...state,
				selectedUsers: state.selectedUsers.filter(
					(selectedUser) => selectedUser.userID !== action.payload
				),
			};
		case "CLEAR_SELECTED_USERS":
			return {
				...state,
				selectedUsers: [],
			};
		case "SET_SEARCH_TERM":
			return {
				...state,
				searchTerm: action.payload,
			};
		case "SET_SEARCHED_USERS":
			return {
				...state,
				searchedUsers: action.payload,
			};
		case "SET_SHOW_USERS":
			return {
				...state,
				showUsers: action.payload,
			};
		default:
			return state;
	}
};
