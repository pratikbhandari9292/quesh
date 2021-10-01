const INITIAL_STATE = {
	showViewer: false,
	images: [],
};

export const imageViewerReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_IMAGE_VIEWER":
			return {
				...state,
				showViewer: action.payload.show,
				images: action.payload.images,
			};
		case "SET_SHOW_VIEWER":
			return { ...state, showViewer: action.payload };
		case "RESET_IMAGE_VIEWER":
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
