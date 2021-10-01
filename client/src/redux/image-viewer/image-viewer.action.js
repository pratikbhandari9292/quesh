export const setImageViewer = (show, images) => {
	return {
		type: "SET_IMAGE_VIEWER",
		payload: { show, images },
	};
};

export const setShowViewer = (show = true) => {
	return {
		type: "SET_SHOW_VIEWER",
		payload: show,
	};
};

export const displayNextImage = () => {
	return {
		type: "DISPLAY_NEXT_IMAGE",
	};
};

export const displayPreviousImage = () => {
	return {
		type: "DISPLAY_PREVIOUS_IMAGE",
	};
};

export const resetImageViewer = () => {
	return {
		type: "RESET_IMAGE_VIEWER",
	};
};
