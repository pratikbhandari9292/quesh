import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { setSearchTerm as setSearchTermRedux } from "../../redux/search/search.actions";

import GenericSearch from "../generic-search/generic-search";

const GroupSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const dispatch = useDispatch();

	const history = useHistory();

	const handleSearchSubmit = () => {
		if (!searchTerm) {
			return;
		}

		dispatch(setSearchTermRedux(searchTerm));
		history.push("/search");
	};

	return (
		<GenericSearch
			placeholder="group name or about..."
			value={searchTerm}
			changeHandler={setSearchTerm}
			submitHandler={handleSearchSubmit}
		/>
	);
};

export default GroupSearch;
