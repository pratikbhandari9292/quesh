const INITIAL_STATE = {
	groups: [],
	loadingGroups: false,
	groupsMessage: "",
	needToFetch: true,
	activeGroup: null,
};

export const groupsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_GROUPS":
			return { ...state, groups: action.payload };
		case "ADD_GROUP":
			return { ...state, groups: [action.payload, ...state.groups] };
		case "UPDATE_GROUP":
			return {
				...state,
				groups: state.groups.map((group) => {
					if (group._id === action.payload.groupID) {
						return { ...group, ...action.payload.updateInfo };
					}

					return group;
				}),
			};
		case "SET_LOADING_GROUPS":
			return { ...state, loadingGroups: action.payload };
		case "SET_GROUPS_MESSAGE":
			return { ...state, groupsMessage: action.payload };
		case "SET_NEED_TO_FETCH_GROUPS":
			return { ...state, needToFetch: action.payload };
		case "REMOVE_GROUP":
			return {
				...state,
				groups: state.groups.filter(
					(group) => group._id !== action.payload
				),
			};
		case "SET_ACTIVE_GROUP":
			return {
				...state,
				activeGroup: action.payload,
			};
		default:
			return state;
	}
};
