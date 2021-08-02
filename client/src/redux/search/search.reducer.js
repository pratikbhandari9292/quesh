const INITIAL_STATE = {
	searchTerm: "",
	searching: false,
	searchMessage: "",
	searchResults: [],
};

export const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_SEARCH_TERM":
			return { ...state, searchTerm: action.payload };
		case "SET_SEARCHING":
			return { ...state, searching: action.payload };
		case "SET_SEARCH_MESSAGE":
			return { ...state, searchMessage: action.payload };
		case "SET_SEARCH_RESULTS":
			return { ...state, searchResults: action.payload };
		default:
			return state;
	}
};
