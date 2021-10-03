const INITIAL_STATE = {
	questions: [],
	sortBy: "time",
	editingQuestion: false,
	displayType: "all",
	needToFetch: true,

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
				questions: [...state.questions, action.payload],
			};
		case "UPDATE_GROUP_QUESTION":
			return {
				...state,
				questions: updateQuestion(state.questions, action),
			};
		case "SET_SORT_TYPE":
			return { ...state, sortBy: action.payload };
		case "SET_DISPLAY_TYPE":
			return { ...state, displayType: action.payload };
		case "SET_EDITING_QUESTION":
			return { ...state, editingQuestion: action.payload };
		case "SET_NEED_TO_FETCH":
			return { ...state, needToFetch: action.payload };
		case "SET_ACTIVE_QUESTION":
			return { ...state, activeQuestion: action.payload };
		case "UPDATE_ACTIVE_QUESTION":
			return {
				...state,
				activeQuestion: { ...state.activeQuestion, ...action.payload },
			};
		case "DELETE_SOLUTION":
			return {
				...state,
				activeQuestion: { ...state.activeQuestion, solution: null },
			};
		case "DELETE_PROPOSED_SOLUTION":
			return {
				...state,
				activeQuestion: {
					...state.activeQuestion,
					proposedSolutions:
						state.activeQuestion.proposedSolutions.filter(
							(proposedSolution) =>
								proposedSolution._id !== action.payload
						),
				},
			};
		case "ADD_SOLUTION":
			return {
				...state,
				activeQuestion: {
					...state.activeQuestion,
					solution: action.payload,
				},
			};
		case "ADD_PROPOSED_SOLUTION":
			return {
				...state,
				activeQuestion: {
					...state.activeQuestion,
					proposedSolutions: [
						...state.activeQuestion.proposedSolutions,
						action.payload,
					],
				},
			};
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
