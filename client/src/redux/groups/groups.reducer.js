const INITIAL_STATE = {
	groups: [],
	groupsMemNum: [],
};

export const groupsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_GROUPS":
			return { ...state, groups: action.payload };
		case "ADD_GROUP":
			return { ...state, groups: [action.payload, ...state.groups] };
		case "SET_MEM_NUM":
			return {
				...state,
				groupsMemNum: [
					...state.groupsMemNum,
					{
						id: action.payload.groupID,
						memNum: action.payload.memNum,
					},
				],
			};
		default:
			return state;
	}
};
