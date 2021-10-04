import React from "react";

import styles from "./user-preview.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import ProfilePicture from "../profile-picture/profile-picture";

const UserPreview = ({ username, subInfo, userID, avatar, profileSize }) => {
	const { _id: currentUserID } = getCurrentUser();

	return (
		<div className={styles.container}>
			<ProfilePicture avatar={avatar} size={profileSize} />

			<div className={styles.userInfo}>
				<p className={styles.username}>
					{currentUserID === userID ? "me" : username}
				</p>
				{subInfo && <p className={styles.subInfo}>{subInfo}</p>}
			</div>
		</div>
	);
};

export default UserPreview;
