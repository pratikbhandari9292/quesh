export const setGroups = (groups) => {
	return {
		type: "SET_GROUPS",
		payload: groups,
	};
};

export const addGroup = (group) => {
	return {
		type: "ADD_GROUP",
		payload: group,
	};
};

export const setMemNum = (groupID, memNum) => {
	return {
		type: "SET_MEM_NUM",
		payload: { groupID, memNum },
	};
};
