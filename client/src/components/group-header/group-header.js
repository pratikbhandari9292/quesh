import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./group-header.module.scss";

import { capitalizeFirstLetter } from "../../utils/utils.strings";

import { ReactComponent as SearchIcon } from "../../assets/icons/search-secondary.svg";
import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg";
import { ReactComponent as NotificationOutlineIcon } from "../../assets/icons/notification-outlined.svg";
import { ReactComponent as UserAddIcon } from "../../assets/icons/user-add.svg";
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";

import OptionsToggle from "../options-toggle/options-toggle";

const GroupHeader = ({ groups, searchResults }) => {
	const [sortOptions, setSortOptions] = useState([
		{
			option: "time",
			title: "created time",
			active: true,
		},
		{
			option: "vote",
			title: "votes",
			active: false,
		},
	]);
	const [groupTitle, setGroupTitle] = useState("");

	const history = useHistory();
	const params = useParams();
	const location = useLocation();

	const groupID = params.id;

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
	}, []);

	const handleBackClick = () => {
		history.goBack();
	};

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				<ArrowLeftIcon
					className={styles.icon}
					onClick={handleBackClick}
				/>
				{groupTitle}
			</p>
			<div className={styles.controls}>
				{!location.pathname.includes("ask") && (
					<OptionsToggle
						options={sortOptions}
						setOptions={setSortOptions}
						type="sort"
					/>
				)}
				<SearchIcon className={styles.icon} />
				<UsersIcon className={styles.icon} />
				<NotificationOutlineIcon className={styles.icon} />
				<UserAddIcon className={styles.icon} />
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

export default connect(mapStateToProps)(GroupHeader);
