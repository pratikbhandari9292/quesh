export const getFormData = (formData, files = []) => {
	if (files.length > 0) {
		files.forEach((file) => {
			formData.append("uploads", file);
		});
	}

	return formData;
};
