import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./group-links.module.scss";

import { ReactComponent as SearchIcon } from "../../../assets/icons/search-secondary.svg";
import { ReactComponent as UsersIcon } from "../../../assets/icons/users.svg";
import { ReactComponent as NotificationOutlineIcon } from "../../../assets/icons/notification-outlined.svg";
import { ReactComponent as UserAddIcon } from "../../../assets/icons/user-add.svg";

import IconContainer from "../../icon-container/icon-container";

const GroupLinks = ({ groupID, activeGroup }) => {
	const history = useHistory();
	const location = useLocation();

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
			text: activeGroup?.memberJoinRequests.length,
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

	return (
		<div className={styles.container}>
			{icons.map((icon) => {
				return (
					<IconContainer
						linkTo={icon.linkTo}
						active={icon.active}
						text={icon.text}
						key={icon.title}
					>
						{icon.icon}
					</IconContainer>
				);
			})}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeGroup: state.groups.activeGroup,
	};
};

export default connect(mapStateToProps)(GroupLinks);
