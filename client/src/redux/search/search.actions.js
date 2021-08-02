export const setSearchTerm = (searchTerm) => {
	return {
		type: "SET_SEARCH_TERM",
		payload: searchTerm,
	};
};

export const setSearching = (searching) => {
	return {
		type: "SET_SEARCHING",
		payload: searching,
	};
};

export const setSearchMessage = (searchMessage) => {
	return {
		type: "SET_SEARCH_MESSAGE",
		payload: searchMessage,
	};
};

export const setSearchResults = (searchResults) => {
	return {
		type: "SET_SEARCH_RESULTS",
		payload: searchResults,
	};
};
