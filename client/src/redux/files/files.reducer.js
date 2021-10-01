const INITIAL_STATE = {
	selectedFiles: [],
};

export const filesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SELECT_FILES":
			return {
				...state,
				selectedFiles: [...state.selectedFiles, ...action.payload],
			};
		case "UNSELECT_FILE":
			return {
				...state,
				selectedFiles: state.selectedFiles.filter(
					(file) => file.name !== action.payload
				),
			};
		case "RESET_FILES":
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
