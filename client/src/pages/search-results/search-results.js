import React from "react";
import { connect } from "react-redux";

import PageHeader from "../../components/page-header/page-header";
import GroupsList from "../../components/groups-list/groups-list";

const SearchResults = ({
	searchTerm,
	searching,
	searchMessage,
	searchResults,
}) => {
	console.log(searchMessage);

	return (
		<div>
			<PageHeader
				title="search results for"
				term={searchTerm}
				align="center"
				capitalize={false}
				color="muted"
			/>

			<GroupsList
				groups={searchResults}
				groupsMessage={searchMessage}
				loadingGroups={searching}
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
