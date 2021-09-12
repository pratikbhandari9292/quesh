export const setGroupMembers = (members) => {
	return {
		type: "SET_GROUP_MEMBERS",
		payload: members,
	};
};

export const removeGroupMember = (userID) => {
	return {
		type: "REMOVE_GROUP_MEMBER",
		payload: userID,
	};
};

export const setNeedToFetch = (needToFetch) => {
	return {
		type: "NEED_TO_FETCH",
		payload: needToFetch,
	};
};

export const resetGroupMembers = () => {
	return {
		type: "RESET_GROUP_MEMBERS",
	};
};
