export const setModal = (
	showModal,
	modalTitle,
	modalChildren,
	closable = true,
	clickHandler,
	showAnimation = true
) => {
	return {
		type: "SET_MODAL",
		payload: {
			showModal,
			modalTitle,
			modalChildren,
			closable,
			clickHandler,
			showAnimation,
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
	return {
		type: "RESET_MODAL",
	};
};

export const displayConfirmationModal = (
	message,
	confirmationHandler,
	showAnimation
) => {
	return (dispatch) => {
		dispatch(
			setModal(
				true,
				message,
				null,
				true,
				confirmationHandler,
				showAnimation
			)
		);
	};
};
