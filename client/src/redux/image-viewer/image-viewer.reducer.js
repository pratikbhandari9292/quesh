const INITIAL_STATE = {
	showViewer: false,
	images: [],
	currentlyDisplayed: 0,
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
		case "DISPLAY_NEXT_IMAGE":
			return {
				...state,
				currentlyDisplayed:
					state.currentlyDisplayed === state.images.length - 1
						? 0
						: state.currentlyDisplayed + 1,
			};
		case "DISPLAY_PREVIOUS_IMAGE":
			return {
				...state,
				currentlyDisplayed:
					state.currentlyDisplayed === 0
						? state.images.length - 1
						: state.currentlyDisplayed - 1,
			};
		case "RESET_IMAGE_VIEWER":
			return { ...state, ...INITIAL_STATE };
		default:
			return state;
	}
};
