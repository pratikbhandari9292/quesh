const INITIAL_STATE = {
	groups: [],
	groupsMemQues: [],
};

export const groupsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_GROUPS":
			return { ...state, groups: action.payload };
		case "ADD_GROUP":
			return { ...state, groups: [action.payload, ...state.groups] };
		case "SET_MEM_QUES":
			return {
				...state,
				groupsMemQues: [
					...state.groupsMemQues,
					{
						id: action.payload.groupID,
						membersNumber: action.payload.memNum,
						unsolvedQuestionsNumber: action.payload.quesNum,
					},
				],
			};
		default:
			return state;
	}
};
