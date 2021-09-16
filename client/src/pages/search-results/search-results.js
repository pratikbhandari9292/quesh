import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { setGroups, setNeedToFetch } from "../../redux/groups/groups.actions";

import {
	setSearching,
	setSearchMessage,
} from "../../redux/search/search.actions";

import { searchGroup } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import PageHeader from "../../components/page-header/page-header";
import CardsList from "../../components/cards-list/cards-list";

const SearchResults = ({ groups, searching, searchMessage, searchTerm }) => {
	const [searchResults, setSearchResults] = useState([]);

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	useEffect(() => {
		fetchSearchResults();
	}, [searchTerm]);

	const fetchSearchResults = async () => {
		dispatch(setSearching(true));
		setSearchResults([]);

		try {
			const result = await searchGroup(searchTerm, currentUser.token);

			dispatch(setSearchMessage(""));

			if (result.error) {
				return;
			}

			if (result.groups) {
				if (result.groups.length > 0) {
					setSearchResults(result.groups);
					dispatch(setNeedToFetch(true));
					return dispatch(setGroups(result.groups));
				}

				return dispatch(setSearchMessage("no group found"));
			}
		} catch (error) {
			dispatch(setSearchMessage("something went wrong"));
		} finally {
			dispatch(setSearching(false));
		}
	};

	return (
		<div>
			<PageHeader
				title={"search results for"}
				term={`${searchTerm} - ${searchResults.length} found`}
				color="muted"
				capFirst
				backArrow
			/>

			<CardsList
				list={searchResults}
				listMessage={searchMessage}
				loadingList={searching}
				messageAlign="left"
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
		searching: state.search.searching,
		searchMessage: state.search.searchMessage,
		searchTerm: state.search.searchTerm,
	};
};

export default connect(mapStateToProps)(SearchResults);
