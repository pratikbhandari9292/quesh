import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./group-header.module.scss";

import { setSortType } from "../../redux/group-questions/group-questions.actions";

import { capitalizeFirstLetter } from "../../utils/utils.strings";

import { ReactComponent as SearchIcon } from "../../assets/icons/search-secondary.svg";
import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg";
import { ReactComponent as NotificationOutlineIcon } from "../../assets/icons/notification-outlined.svg";
import { ReactComponent as UserAddIcon } from "../../assets/icons/user-add.svg";
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";

import OptionsToggle from "../options-toggle/options-toggle";
import { activateOption } from "../../utils/utils.options-toggle";

const GroupHeader = ({ groups, searchResults, sortBy }) => {
	const [sortOptions, setSortOptions] = useState([
		{
			option: "time",
			title: "created time",
			active: false,
		},
		{
			option: "vote",
			title: "votes",
			active: false,
		},
	]);
	const [groupTitle, setGroupTitle] = useState("");
	const [groupSubtitle, setGroupSubtitle] = useState("");

	const history = useHistory();
	const params = useParams();
	const location = useLocation();

	const groupID = params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = `${capitalizeFirstLetter(
			groupTitle
		)} - ${capitalizeFirstLetter(groupSubtitle)}`;
	}, [groupTitle, groupSubtitle]);

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

	useEffect(() => {
		setSortOptions(activateOption(sortOptions, sortBy));
	}, [sortBy]);

	useEffect(() => {
		const pathname = location.pathname;

		if (pathname.includes("explore")) {
			return setGroupSubtitle("questions");
		}

		if (pathname.includes("join-requests")) {
			return setGroupSubtitle("join requests");
		}

		if (pathname.includes("notifications")) {
			return setGroupSubtitle("notifications");
		}

		if (pathname.includes("select")) {
			return setGroupSubtitle("select users");
		}

		if (pathname.includes("finalize")) {
			return setGroupSubtitle("finalize users");
		}
	}, [location]);

	const handleBackClick = () => {
		history.goBack();
	};

	const sortOptionSelectHandler = (option) => {
		dispatch(setSortType(option));
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.iconContainer}>
					<ArrowLeftIcon
						className={styles.icon}
						onClick={handleBackClick}
					/>
				</div>
				{`${capitalizeFirstLetter(groupTitle)} - ${groupSubtitle}`}
			</div>
			<div className={styles.controls}>
				{!location.pathname.includes("ask") && (
					<OptionsToggle
						options={sortOptions}
						selectHandler={sortOptionSelectHandler}
						type="sort"
					/>
				)}
				<NotificationOutlineIcon className={styles.icon} />
				<SearchIcon className={styles.icon} />
				<UsersIcon
					className={styles.icon}
					onClick={() => {
						return history.push(`/group/${groupID}/join-requests`);
					}}
				/>
				<UserAddIcon
					className={styles.icon}
					onClick={() => {
						return history.push(
							`/group/${groupID}/add-members/select`
						);
					}}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
		searchResults: state.search.searchResults,
		sortBy: state.groupQuestions.sortBy,
	};
};

export default connect(mapStateToProps)(GroupHeader);
