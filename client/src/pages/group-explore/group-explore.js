import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./group-explore.module.scss";

import { getGroupDetails } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";
import { capitalizeFirstLetter } from "../../utils/utils.strings";

import StatusMessage from "../../components/status-message/status-message";
import GroupHeader from "../../components/group-header/group-header";
import OptionsToggle from "../../components/options-toggle/options-toggle";
import Button from "../../components/button/button";

const GroupExplore = ({ groups, searchResults }) => {
	const [groupDetails, setGroupDetails] = useState(null);
	const [loadingDetails, setLoadingDetails] = useState(false);
	const [detailsMessage, setDetailsMessage] = useState("");
	const [groupTitle, setGroupTitle] = useState("");
	const [toggleOptions, setToggleOptions] = useState(["unsolved", "solved"]);

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	useEffect(() => {
		document.title = capitalizeFirstLetter(groupTitle);
	}, [groupTitle]);

	useEffect(() => {
		const foundInGroups = groups.find((group) => group._id === groupID);

		if (foundInGroups) {
			return setGroupTitle(foundInGroups.title);
		}

		const foundInSearchResults = searchResults.find(
			(group) => group._id === groupID
		);

		if (foundInSearchResults) {
			return setGroupTitle(foundInSearchResults.title);
		}

		// fetchGroupDetails();
	}, []);

	const fetchGroupDetails = async () => {
		setLoadingDetails(true);
		setDetailsMessage("loading group details...");

		try {
			const result = await getGroupDetails(groupID, currentUser.token);

			if (result.error) {
				return setDetailsMessage(result.error);
			}

			setGroupDetails(result.group);
		} catch (error) {
			console.log(error);
			setDetailsMessage("something went wrong");
		} finally {
			setLoadingDetails(false);
		}
	};

	// if (!groupDetails) {
	// 	return (
	// 		<StatusMessage message={detailsMessage} spinner={loadingDetails} />
	// 	);
	// }

	return (
		<div className={styles.container}>
			<GroupHeader title={groupTitle} />
			<div className={styles.optionsToggle}>
				<OptionsToggle options={toggleOptions} />
			</div>
			<div className={styles.askContainer}>
				<Button color="blue">Ask Question</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
		searchResults: state.search.searchResults,
	};
};

export default connect(mapStateToProps)(GroupExplore);
