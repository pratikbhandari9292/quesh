export const setActiveSolution = (solution) => {
	return {
		type: "SET_ACTIVE_SOLUTION",
		payload: solution,
	};
};

export const updateActiveSolution = (updateInfo) => {
	return {
		type: "UPDATE_ACTIVE_SOLUTION",
		payload: updateInfo,
	};
};
