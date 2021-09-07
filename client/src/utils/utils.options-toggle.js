export const activateOption = (options, option) => {
	return options.map((optionItem) => {
		if (optionItem.option === option) {
			return { ...optionItem, active: true };
		}

		return { ...optionItem, active: false };
	});
};
