const INITIAL_STATE = {
	activeSolution: null,
};

export const solutionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ACTIVE_SOLUTION":
			return { ...state, activeSolution: action.payload };
		case "UPDATE_ACTIVE_SOLUTION":
			return {
				...state,
				activeSolution: { ...state.activeSolution, ...action.payload },
			};
		default:
			return state;
	}
};
