export const setModalInfo = (showModal, modalTitle, modalChildren) => {
	return {
		type: "SET_MODAL_INFO",
		payload: { showModal, modalTitle, modalChildren },
	};
};

export const setClosable = (closable) => {
	return {
		type: "SET_CLOSABLE",
		payload: closable,
	};
};
