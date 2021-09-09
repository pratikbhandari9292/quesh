import { getCurrentUser } from "../local-storage/current-user";

// const baseURL = "http://localhost:5000/api/user";
const baseURL = "/api/user";
const currentUser = getCurrentUser();

export const signInOrRegister = async (type, userInfo) => {
	const result = await fetch(`${baseURL}/${type}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userInfo),
	});

	const data = await result.json();

	return data;
};

export const searchUser = async (searchTerm) => {
	const result = await fetch(`${baseURL}/search/${searchTerm}`, {
		headers: {
			"Content-Type": "application/json",
			"auth-token": currentUser.token,
		},
	});

	const data = await result.json();

	return data;
};
