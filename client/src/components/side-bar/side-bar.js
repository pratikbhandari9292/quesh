import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import styles from "./side-bar.module.scss";

import { ReactComponent as GroupIcon } from "../../assets/icons/groups.svg";
import { ReactComponent as PaperPlaneIcon } from "../../assets/icons/paper-plane.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";

const SideBar = () => {
	const [navLinks, setNavLinks] = useState([
		{
			title: "groups",
			linkTo: "/groups/me",
			icon: <GroupIcon />,
			active: false,
		},
		{
			title: "questions",
			linkTo: "/questions/me",
			icon: <PaperPlaneIcon />,
			active: false,
		},
		{
			title: "notifications",
			linkTo: "/notifications",
			icon: <NotificationIcon />,
			active: false,
		},
		{
			title: "settings",
			linkTo: "/settings",
			icon: <SettingsIcon />,
			active: false,
		},
	]);

	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		setNavLinks(
			navLinks.map((navLink) => {
				if (location.pathname.includes(navLink.title)) {
					return { ...navLink, active: true };
				}
				return { ...navLink, active: false };
			})
		);
	}, [location]);

	return (
		<nav className={styles.container}>
			<ul>
				{navLinks.map((navLink) => {
					return (
						<li
							className={`${styles.navLink} ${
								navLink.active && styles.navLinkActive
							}`}
							key={navLink.title}
							onClick={() => {
								history.push(navLink.linkTo);
							}}
						>
							{navLink.icon} <span>{navLink.title}</span>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default SideBar;
