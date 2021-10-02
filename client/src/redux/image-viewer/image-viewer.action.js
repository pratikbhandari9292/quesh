export const setImageViewer = (show, images, current = 0, imageSize) => {
	return {
		type: "SET_IMAGE_VIEWER",
		payload: { show, images, current, imageSize },
	};
};

export const setShowViewer = (show = true) => {
	return {
		type: "SET_SHOW_VIEWER",
		payload: show,
	};
};

export const setCurrentlyDisplayed = (index) => {
	return {
		type: "SET_CURRENTLY_DISPLAYED",
		payload: index,
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
