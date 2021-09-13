export const setShowMenu = (showMenu) => {
	return {
		type: "SET_SHOW_MENU",
		payload: showMenu,
	};
};

export const displayMenu = () => {
	return (dispatch) => {
		dispatch(setShowMenu(true));
	};
};

export const hideMenu = () => {
	return (dispatch) => {
		dispatch(setShowMenu(false));
	};
};
