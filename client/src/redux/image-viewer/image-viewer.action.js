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

export const resetImageViewer = () => {
	return {
		type: "RESET_IMAGE_VIEWER",
	};
};
