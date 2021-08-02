import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
	setSearchTerm as setSearchTermRedux,
	setSearching,
	setSearchMessage,
	setSearchResults,
} from "../../redux/search/search.actions";

import { searchGroup } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import GenericSearch from "../generic-search/generic-search";

const GroupSearch = ({ searchTermRedux }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();

	const handleSearchSubmit = () => {
		if (!searchTerm) {
			return;
		}

		if (location.pathname.includes("search")) {
			if (searchTerm.toLowerCase().trim() === searchTermRedux) {
				return;
			}
		}

		dispatch(setSearchTermRedux(searchTerm.toLowerCase().trim()));
		dispatch(setSearching(true));
		dispatch(setSearchMessage("searching for groups..."));
		dispatch(setSearchResults([]));

		history.push("/search");

		fetchSearchResults();
	};

	const fetchSearchResults = async () => {
		try {
			const result = await searchGroup(searchTerm, currentUser.token);

			if (result.error) {
				return;
			}

			if (result.groups) {
				if (result.groups.length > 0) {
					return dispatch(setSearchResults(result.groups));
				}

				dispatch(setSearchMessage("no group found"));
			}
		} catch (error) {
			console.log(error);
			dispatch(setSearchMessage("something went wrong"));
		} finally {
			dispatch(setSearching(false));
		}
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

const mapStateToProps = (state) => {
	return {
		searchTermRedux: state.search.searchTerm,
	};
};

export default connect(mapStateToProps)(GroupSearch);
