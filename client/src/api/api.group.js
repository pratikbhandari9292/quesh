const baseURL = "http://localhost:5000/api/group";
// const baseURL = "/api/group";

export const getUserGroups = async (userID, token) => {
	const result = await fetch(`${baseURL}/${userID}/groups`, {
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const getMemNum = async (groupID, token) => {
	const result = await fetch(`${baseURL}/${groupID}/mem-num`, {
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const joinGroup = async (joinID, token) => {
	try {
		const result = await fetch(`${baseURL}/join/${joinID}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": token,
			},
		});

		const data = await result.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createGroup = async (token, groupInfo) => {
	const result = await fetch(`${baseURL}/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(groupInfo),
	});

	const data = await result.json();

	return data;
};

export const getGroupDetails = async (groupID, token) => {
	const result = await fetch(`${baseURL}/${groupID}`, {
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const requestGroupJoin = async (groupID, token) => {
	const result = await fetch(`${baseURL}/${groupID}/request`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const searchGroup = async (searchTerm, token) => {
	const result = await fetch(`${baseURL}/search/${searchTerm}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const getGroupQuestions = async (groupID, sortBy, token) => {
	const result = await fetch(
		`${baseURL}/${groupID}/questions/?sortBy=${
			sortBy === "time" ? "createdAt" : "votesNumber"
		}`,
		{
			headers: {
				"auth-token": token,
			},
		}
	);

	const data = await result.json();

	return data;
};

export const acceptOrRejectJoinRequest = async (
	groupID,
	action,
	requestUserID,
	token
) => {
	const result = await fetch(
		`${baseURL}/${groupID}/request/?action=${action}&requestUserID=${requestUserID}`,
		{
			method: "PATCH",
			headers: {
				"auth-token": token,
			},
		}
	);

	const data = await result.json();

	return data;
};
