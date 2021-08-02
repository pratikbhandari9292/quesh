const INITIAL_STATE = {
	alertInfo: {
		showAlert: false,
		alertText: "",
		success: true,
	},
};

export const alertReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SHOW_ALERT":
			return {
				...state,
				alertInfo: {
					...state.alertInfo,
					showAlert: true,
					...action.payload,
				},
			};
		case "HIDE_ALERT":
			return {
				...state,
				alertInfo: {
					...state.alertInfo,
					showAlert: false,
					alertText: "",
				},
			};
		default:
			return state;
	}
};
