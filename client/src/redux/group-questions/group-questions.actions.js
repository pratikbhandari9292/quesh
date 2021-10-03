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

export const setDisplayType = (displayType) => {
	return {
		type: "SET_DISPLAY_TYPE",
		payload: displayType,
	};
};

export const setEditingQuestion = (editing) => {
	return {
		type: "SET_EDITING_QUESTION",
		payload: editing,
	};
};

export const setNeedToFetch = (needToFetch) => {
	return {
		type: "SET_NEED_TO_FETCH",
		payload: needToFetch,
	};
};

export const setActiveQuestion = (question) => {
	return {
		type: "SET_ACTIVE_QUESTION",
		payload: question,
	};
};

export const updateActiveQuestion = (updateInfo) => {
	return {
		type: "UPDATE_ACTIVE_QUESTION",
		payload: updateInfo,
	};
};

export const deleteSolution = (type, solutionID) => {
	if (type === "solution") {
		return {
			type: "DELETE_SOLUTION",
		};
	}

	return {
		type: "DELETE_PROPOSED_SOLUTION",
		payload: solutionID,
	};
};

export const addSolution = (type, solution) => {
	return {
		type: type === "solution" ? "ADD_SOLUTION" : "ADD_PROPOSED_SOLUTION",
		payload: solution,
	};
};

export const setSearchedQuestions = (questions) => {
	return {
		type: "SET_SEARCHED_QUESTIONS",
		payload: questions,
	};
};

export const updateSearchedQuestion = (questionID, updateInfo) => {
	return {
		type: "UPDATE_SEARCHED_QUESTION",
		payload: { questionID, updateInfo },
	};
};

export const removeGroupQuestion = (questionID) => {
	return {
		type: "REMOVE_GROUP_QUESTION",
		payload: questionID,
	};
};

export const resetGroupQuestions = () => {
	return {
		type: "RESET_GROUP_QUESTIONS",
	};
};
