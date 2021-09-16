export const setGroupQuestions = (questions, groupID) => {
	return {
		type: "SET_GROUP_QUESTIONS",
		payload: { questions, groupID },
	};
};

export const addGroupQuestion = (question) => {
	return {
		type: "ADD_GROUP_QUESTION",
		payload: question,
	};
};

export const setGroupID = (groupID) => {
	return {
		type: "SET_GROUP_ID",
		payload: groupID,
	};
};

export const updateGroupQuestion = (questionID, updateInfo) => {
	return {
		type: "UPDATE_GROUP_QUESTION",
		payload: { questionID, updateInfo },
	};
};

export const setSortType = (sortType) => {
	return {
		type: "SET_SORT_TYPE",
		payload: sortType,
	};
};

export const setActiveQuestion = (question) => {
	return {
		type: "SET_ACTIVE_QUESTION",
		payload: question,
	};
};

export const resetGroupQuestions = () => {
	return {
		type: "RESET_GROUP_QUESTIONS",
	};
};
