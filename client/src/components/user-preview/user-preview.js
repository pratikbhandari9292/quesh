import React from "react";

import styles from "./user-preview.module.scss";

import ProfilePicture from "../profile-picture/profile-picture";

const UserPreview = ({ username, avatar, profileSize }) => {
	return (
		<div className={styles.container}>
			<ProfilePicture avatar={avatar} size={profileSize} />
			<p className={styles.username}>{username}</p>
		</div>
	);
};

export default UserPreview;
