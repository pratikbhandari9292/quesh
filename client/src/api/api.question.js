// const baseURL = "http://localhost:5000/api/question";
const baseURL = "/api/question";

export const askQuestion = async (questionInfo, groupID, token) => {
	const result = await fetch(`${baseURL}/${groupID}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(questionInfo),
	});

	const data = await result.json();

	return data;
};

export const updateQuestion = async (questionID, updateInfo, token) => {
	const result = await fetch(`${baseURL}/${questionID}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(updateInfo),
	});

	const data = await result.json();

	return data;
};
