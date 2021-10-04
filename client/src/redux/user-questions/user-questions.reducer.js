const INITIAL_STATE = {
	questions: [],
	questionsMessage: "",
	needToFetch: true,
};

export const userQuestionsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_USER_QUESTIONS":
			return { ...state, questions: action.payload };
		case "SET_QUESTIONS_MESSAGE":
			return { ...state, questionsMessage: action.payload };
		case "SET_NEED_TO_FETCH_UQ":
			return { ...state, needToFetch: action.payload };
		case "ADD_USER_QUESTION":
			return {
				...state,
				questions: [...state.questions, action.payload],
			};
		case "REMOVE_USER_QUESTION":
			return {
				...state,
				questions: state.questions.filter(
					(question) => question._id !== action.payload
				),
			};
		case "RESET_USER_QUESTIONS":
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
