import React from "react";
import { useDispatch } from "react-redux";

import { setImageViewer } from "../../redux/image-viewer/image-viewer.action";

import styles from "./profile-picture.module.scss";

const ProfilePicture = ({ avatar, size, expand = false, rounded = true }) => {
	const dispatch = useDispatch();

	const handleProfilePictureClick = () => {
		if (!expand) {
			return;
		}

		dispatch(setImageViewer(true, [avatar], 0, "smaller"));
	};

	return (
		<div
			className={`${styles.container} ${
				size === "smaller" && styles.containerSmaller
			} ${size === "bigger" && styles.containerBigger} ${
				rounded && styles.containerRounded
			}`}
			onClick={handleProfilePictureClick}
		>
			<img src={`${avatar}`} alt="avatar" className={styles.image} />
		</div>
	);
};

export default ProfilePicture;
