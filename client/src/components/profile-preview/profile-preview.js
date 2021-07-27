import React from "react";

import styles from "./profile-preview.module.scss";

import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";

import ProfilePicture from "../profile-picture/profile-picture";

const ProfilePreview = ({ username }) => {
	return (
		<div className={styles.container}>
			<ProfilePicture username={username} />
			<span className={styles.username}>{username}</span>
			<ChevronDownIcon className={styles.icon} />
		</div>
	);
};

export default ProfilePreview;
