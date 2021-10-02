import { getFormData } from "./api.utils";

// const baseURL = "http://localhost:5000/api/question";
const baseURL = "/api/question";

export const askQuestion = async (questionInfo, groupID, token) => {
	let formData = new FormData();

	formData.append("title", questionInfo.title);
	formData.append("description", questionInfo.description);

	formData = getFormData(formData, questionInfo.images);

	const result = await fetch(`${baseURL}/${groupID}`, {
		method: "POST",
		headers: {
			"auth-token": token,
		},
		body: formData,
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

export const searchQuestion = async (searchTerm, groupID, token) => {
	const result = await fetch(
		`${baseURL}/search/${searchTerm}/?groupID=${groupID}`,
		{
			headers: {
				"auth-token": token,
			},
		}
	);

	const data = await result.json();

	return data;
};

export const deleteQuestion = async (questionID, token) => {
	const result = await fetch(`${baseURL}/${questionID}`, {
		method: "DELETE",
		headers: {
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};
