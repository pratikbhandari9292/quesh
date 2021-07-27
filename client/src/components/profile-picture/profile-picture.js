import React from "react";

import styles from "./profile-picture.module.scss";

const ProfilePicture = ({ url, username }) => {
	return (
		<div className={styles.container}>
			{url && <img src="" alt="" />}
			{username && <span className={styles.text}>{username[0]}</span>}
		</div>
	);
};

export default ProfilePicture;
