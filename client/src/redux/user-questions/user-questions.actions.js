export const setUserQuestions = (questions) => {
	return {
		type: "SET_USER_QUESTIONS",
		payload: questions,
	};
};

export const setQuestionsMessage = (message) => {
	return {
		type: "SET_QUESTIONS_MESSAGE",
		payload: message,
	};
};

export const setNeedToFetchUQ = (needToFetch) => {
	return {
		type: "SET_NEED_TO_FETCH_UQ",
		payload: needToFetch,
	};
};

export const addUserQuestion = (question) => {
	return {
		type: "ADD_USER_QUESTION",
		payload: question,
	};
};

export const removeUserQuestion = (questionID) => {
	return {
		type: "REMOVE_USER_QUESTION",
		payload: questionID,
	};
};

export const resetUserQuestions = () => {
	return {
		type: "RESET_USER_QUESTIONS",
	};
};
