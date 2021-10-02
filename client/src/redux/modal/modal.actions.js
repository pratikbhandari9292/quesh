import Spinner from "../../components/spinner/spinner";

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

export const displayConfirmationModal = (
	message,
	confirmationHandler,
	showAnimation = false
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

export const displayLoadingModal = (message) => {
	return (dispatch) => {
		dispatch(setModal(true, message, <Spinner />, false));
	};
};

export const resetModal = () => {
	return {
		type: "RESET_MODAL",
	};
};
