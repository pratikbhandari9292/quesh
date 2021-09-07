import React from "react";

import styles from "./profile-picture.module.scss";

const ProfilePicture = ({ url, username, size }) => {
	return (
		<div
			className={`${styles.container} ${
				size === "smaller" && styles.containerSmaller
			}`}
		>
			{url && <img src="" alt="" />}
			{username && <span className={styles.text}>{username[0]}</span>}
		</div>
	);
};

export default ProfilePicture;
