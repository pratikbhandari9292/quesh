const baseURL = "http://localhost:5000/api/user";
// const baseURL = "/api/user";

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
