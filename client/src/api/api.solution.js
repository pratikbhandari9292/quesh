import { getFormData } from "./api.utils";

const baseURL = "/api/solution";

export const solveOrPropose = async (solutionInfo, questionID, type, token) => {
	let formData = new FormData();

	formData.append("description", solutionInfo.description);

	formData = getFormData(formData, solutionInfo.images);

	const result = await fetch(`${baseURL}/${questionID}/?type=${type}`, {
		method: "POST",
		headers: {
			"auth-token": token,
		},
		body: formData,
	});

	const data = await result.json();

	return data;
};

export const deleteSolution = async (solutionID, type, token) => {
	const result = await fetch(`${baseURL}/${solutionID}/?type=${type}`, {
		method: "DELETE",
		headers: {
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const approveSolution = async (solutionID, token) => {
	const result = await fetch(`${baseURL}/approve/${solutionID}`, {
		method: "PUT",
		headers: {
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const updateSolution = async (solutionID, updateInfo, token) => {
	const result = await fetch(`${baseURL}/${solutionID}`, {
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

export const getProposedSolutions = async (questionID, token) => {
	const result = await fetch(`${baseURL}/proposed/${questionID}`, {
		headers: {
			"auth-token": token
		}
	})
	const data = await result.json();
	return data
}