const INITIAL_STATE = {
	members: [],
	needToFetch: true,
};

export const groupMembersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_GROUP_MEMBERS":
			return { ...state, members: [...state.members, ...action.payload] };
		case "REMOVE_GROUP_MEMBER":
			return {
				...state,
				members: state.members.filter(
					(member) => member._id !== action.payload
				),
			};
		case "SET_NEED_TO_FETCH_MEMBERS":
			return {
				...state,
				needToFetch: action.payload,
			};
		case "RESET_GROUP_MEMBERS":
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};
