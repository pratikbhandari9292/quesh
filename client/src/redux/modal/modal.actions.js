export const setModal = (
	showModal,
	modalTitle,
	modalChildren,
	closable = true,
	clickHandler
) => {
	return {
		type: "SET_MODAL",
		payload: {
			showModal,
			modalTitle,
			modalChildren,
			closable,
			clickHandler,
		},
	};
};

export const setClosable = (closable) => {
	return {
		type: "SET_CLOSABLE",
		payload: closable,
	};
};

export const resetModal = () => {
	return (dispatch) => {
		dispatch(setModal(false, ""));
		dispatch(setClosable(true));
	};
};
