const baseURL = "/api/image";

export const deleteImage = async (contentID, type, src, token) => {
	const result = await fetch(
		`${baseURL}/${contentID}/?type=${type}&src=${src}`,
		{
			method: "DELETE",
			headers: {
				"auth-token": token,
			},
		}
	);

	const data = await result.json();

	return data;
};
