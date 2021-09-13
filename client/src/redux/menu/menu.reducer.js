const INITIAL_STATE = {
	showMenu: false,
};

export const menuReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_SHOW_MENU":
			return { ...state, showMenu: action.payload };
		default:
			return state;
	}
};
