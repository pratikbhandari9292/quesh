import React from "react";
import { useDispatch } from "react-redux";

import styles from "./content-image.module.scss";

import { setImageViewer } from "../../redux/image-viewer/image-viewer.action";

import { ReactComponent as BackgroundImage } from "../../assets/icons/background-image.svg";

const ContentImage = ({ src, index, images, fullScreen }) => {
	const dispatch = useDispatch();

	const handleContainerClick = () => {
		if (fullScreen) {
			return;
		}

		dispatch(setImageViewer(true, images, index));
	};

	return (
		<div className={styles.container} onClick={handleContainerClick}>
			<BackgroundImage className={styles.backgroundImage} />
			<img src={src} alt="img" className={styles.image} />
		</div>
	);
};

export default ContentImage;
