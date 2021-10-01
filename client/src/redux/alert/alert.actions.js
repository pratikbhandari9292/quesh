const showAlert = (alertText, success) => {
	return {
		type: "SHOW_ALERT",
		payload: { alertText, success },
	};
};

const hideAlert = () => {
	return {
		type: "HIDE_ALERT",
	};
};

export const displayAlert = (alertText, success = true) => {
	return (dispatch) => {
		dispatch(showAlert(alertText, success));

		setTimeout(() => {
			dispatch(hideAlert());
		}, 2500);
	};
};

export const displayErrorAlert = (
	alertText = "something went wrong, try again"
) => {
	return (dispatch) => {
		dispatch(displayAlert(alertText, false));
	};
};
