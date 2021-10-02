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
