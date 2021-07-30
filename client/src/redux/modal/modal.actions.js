export const setModalInfo = (showModal, modalTitle, modalChildren) => {
	return {
		type: "SET_MODAL_INFO",
		payload: { showModal, modalTitle, modalChildren },
	};
};
