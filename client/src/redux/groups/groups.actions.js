export const setGroups = (groups) => {
	return {
		type: "SET_GROUPS",
		payload: groups,
	};
};

export const addGroup = (group) => {
	return {
		type: "ADD_GROUP",
		payload: group,
	};
};

export const setMemQues = (groupID, memNum, quesNum) => {
	return {
		type: "SET_MEM_QUES",
		payload: { groupID, memNum, quesNum },
	};
};
