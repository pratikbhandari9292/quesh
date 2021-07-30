const baseURL = "http://localhost:5000/api/group";

export const getMemQuesNumber = async (groupID, token) => {
	const result = await fetch(`${baseURL}/${groupID}/mem-ques`, {
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
