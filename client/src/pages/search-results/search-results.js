import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { setSearchTerm } from "../../redux/search/search.actions";

import PageHeader from "../../components/page-header/page-header";
import CardsList from "../../components/cards-list/cards-list";

const SearchResults = ({
	searchTerm,
	searching,
	searchMessage,
	searchResults,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(setSearchTerm(""));
		};
	}, []);

	return (
		<div>
			<PageHeader
				title="search results for"
				term={searchTerm}
				align="center"
				capitalize={false}
				color="muted"
			/>

			<CardsList
				list={searchResults}
				listMessage={searchMessage}
				loadingList={searching}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		searchTerm: state.search.searchTerm,
		searching: state.search.searching,
		searchMessage: state.search.searchMessage,
		searchResults: state.search.searchResults,
	};
};

export default connect(mapStateToProps)(SearchResults);
