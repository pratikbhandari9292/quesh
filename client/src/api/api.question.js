const baseURL = "http://localhost:5000/api/question";

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
