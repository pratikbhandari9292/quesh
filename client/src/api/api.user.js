// const baseURL = "http://localhost:5000/api/user";
const baseURL = "/api/user";

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

export const searchUser = async (searchTerm, token) => {
	const result = await fetch(`${baseURL}/search/${searchTerm}`, {
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const getUserDetails = async (userID, token) => {
	const result = await fetch(`${baseURL}/${userID}`, {
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	const data = await result.json();

	return data;
};

export const updateUserProfile = async (userID, updateInfo, token) => {
	const formData = new FormData();

	formData.append("username", updateInfo.username);

	if (updateInfo.avatar) {
		formData.append("avatar", updateInfo.avatar);
	}

	const result = await fetch(`${baseURL}/update/${userID}`, {
		method: "PATCH",
		headers: {
			"auth-token": token,
		},
		body: formData,
	});

	const data = await result.json();

	return data;
};
