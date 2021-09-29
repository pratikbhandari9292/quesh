import React from "react";

import styles from "./profile-picture.module.scss";

const ProfilePicture = ({ avatar, size }) => {
	return (
		<div
			className={`${styles.container} ${
				size === "smaller" && styles.containerSmaller
			}`}
		>
			<img src={`${avatar}`} alt="avatar" className={styles.image} />
		</div>
	);
};

export default ProfilePicture;
