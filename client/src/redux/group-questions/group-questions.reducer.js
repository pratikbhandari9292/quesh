const INITIAL_STATE = {
	questions: [],
	sortBy: "time",

	searchedQuestions: [],

	activeQuestion: null,
};

export const groupQuestionsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_GROUP_QUESTIONS":
			return {
				...state,
				questions: action.payload.questions,
				groupID: action.payload.groupID,
			};
		case "ADD_GROUP_QUESTION":
			return {
				...state,
				questions: [action.payload, ...state.questions],
			};
		case "UPDATE_GROUP_QUESTION":
			return {
				...state,
				questions: updateQuestion(state.questions, action),
			};
		case "SET_SORT_TYPE":
			return { ...state, sortBy: action.payload };
		case "SET_ACTIVE_QUESTION":
			return { ...state, activeQuestion: action.payload };
		case "SET_SEARCHED_QUESTIONS":
			return { ...state, searchedQuestions: action.payload };
		case "UPDATE_SEARCHED_QUESTION":
			return {
				...state,
				searchedQuestions: updateQuestion(
					state.searchedQuestions,
					action
				),
			};
		case "REMOVE_GROUP_QUESTION":
			return {
				...state,
				questions: deleteQuestion(state.questions, action.payload),
				searchedQuestions: deleteQuestion(
					state.searchedQuestions,
					action.payload
				),
			};
		case "RESET_GROUP_QUESTIONS":
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};

function updateQuestion(questionArr, action) {
	const questionID = action.payload.questionID;
	const updateInfo = action.payload.updateInfo;

	return questionArr.map((question) => {
		if (question._id === questionID) {
			return { ...question, ...updateInfo };
		}

		return question;
	});
}

function deleteQuestion(questionArr, questionID) {
	return questionArr.filter((question) => question._id !== questionID);
}
