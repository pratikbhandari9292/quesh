const INITIAL_STATE = {
	currentUser: false,
	updates: 0,
};

export const currentUserReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER":
			return { ...state, currentUser: action.payload };
		case "INCREMENT_USER_UPDATES":
			return { ...state, updates: state.updates + 1 };
		case "RESET_CURRENT_USER":
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
