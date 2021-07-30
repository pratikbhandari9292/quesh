const INITIAL_STATE = {
	modalInfo: {
		showModal: false,
		modalTitle: "",
		modalChildren: null,
	},
};

export const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_MODAL_INFO":
			return {
				...state,
				modalInfo: { ...state.modalInfo, ...action.payload },
			};
		default:
			return state;
	}
};
