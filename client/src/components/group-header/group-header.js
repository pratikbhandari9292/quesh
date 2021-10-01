import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { setSortType } from "../../redux/group-questions/group-questions.actions";

import { capitalizeFirstLetter } from "../../utils/utils.strings";
import { activateOption } from "../../utils/utils.options-toggle";

import { ReactComponent as SearchIcon } from "../../assets/icons/search-secondary.svg";
import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg";
import { ReactComponent as NotificationOutlineIcon } from "../../assets/icons/notification-outlined.svg";
import { ReactComponent as UserAddIcon } from "../../assets/icons/user-add.svg";

import OptionsToggle from "../options-toggle/options-toggle";
import GroupMenu from "./group-menu/group-menu";
import IconContainer from "../icon-container/icon-container";
import ContentHeader from "../content-header/content-header";

const GroupHeader = ({ groups, searchResults, sortBy, groupQuestions }) => {
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
	const [activeGroup, setActiveGroup] = useState(null);

	const params = useParams();
	const groupID = params.id;

	const [icons, setIcons] = useState([
		{
			icon: <NotificationOutlineIcon />,
			linkTo: null,
			active: false,
			activeLinks: ["notifications"],
			title: "notifications",
		},
		{
			icon: <SearchIcon />,
			linkTo: `/group/${groupID}/search`,
			active: false,
			activeLinks: ["search"],
			title: "search",
		},
		{
			icon: <UsersIcon />,
			linkTo: `/group/${groupID}/join-requests`,
			active: false,
			activeLinks: ["join-requests"],
			title: "join-requests",
		},
		{
			icon: (
				<UserAddIcon
					onClick={() => {
						return history.push(
							`/group/${groupID}/add-members/select`
						);
					}}
				/>
			),
			linkTo: `/group/${groupID}/add-members/select`,
			active: false,
			activeLinks: ["select", "finalize"],
			title: "add-members",
		},
	]);

	const history = useHistory();
	const location = useLocation();

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
			return setGroupSubtitle("add users");
		}

		if (pathname.includes("finalize")) {
			return setGroupSubtitle("finalize users");
		}

		if (pathname.includes("members")) {
			return setGroupSubtitle("members");
		}

		if (pathname.includes("delegate-ownership")) {
			return setGroupSubtitle("delegate ownership");
		}

		if (pathname.includes("question/search")) {
			return setGroupSubtitle("search question");
		}
	}, [location]);

	useEffect(() => {
		setIcons(
			icons.map((icon) => {
				if (
					icon.activeLinks.find((activeLink) =>
						location.pathname.includes(activeLink)
					)
				) {
					return { ...icon, active: true };
				}

				return { ...icon, active: false };
			})
		);
	}, [location]);

	useEffect(() => {
		setActiveGroup(groups.find((group) => group._id === groupID));
	}, []);

	const sortOptionSelectHandler = (option) => {
		dispatch(setSortType(option));
	};

	const renderOptionsToggle = () => {
		if (
			location.pathname.includes("explore") &&
			groupQuestions.length > 0
		) {
			return (
				<OptionsToggle
					options={sortOptions}
					selectHandler={sortOptionSelectHandler}
					type="sort"
				/>
			);
		}
	};

	return (
		<ContentHeader
			title={`${capitalizeFirstLetter(
				groupTitle
			)} - ${capitalizeFirstLetter(groupSubtitle)}`}
		>
			{renderOptionsToggle()}

			{icons.map((icon) => {
				return (
					<IconContainer
						linkTo={icon.linkTo}
						active={icon.active}
						key={icon.title}
					>
						{icon.icon}
					</IconContainer>
				);
			})}

			<IconContainer>
				<GroupMenu owner={activeGroup?.owner._id} />
			</IconContainer>
		</ContentHeader>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
		searchResults: state.search.searchResults,
		sortBy: state.groupQuestions.sortBy,
		groupQuestions: state.groupQuestions.questions,
	};
};

export default connect(mapStateToProps)(GroupHeader);
