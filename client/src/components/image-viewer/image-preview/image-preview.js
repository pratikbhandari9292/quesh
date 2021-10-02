import React from "react";
import { useDispatch } from "react-redux";

import { setCurrentlyDisplayed } from "../../../redux/image-viewer/image-viewer.action";

import styles from "./image-preview.module.scss";
import imageStyles from "../../../styles/image.module.scss";

const ImagePreview = ({ src, index, active }) => {
	const dispatch = useDispatch();

	const handleContainerClick = (event) => {
		dispatch(setCurrentlyDisplayed(index));
	};

	return (
		<div
			className={`${styles.container} ${
				active && styles.containerActive
			}`}
			onClick={handleContainerClick}
		>
			<img src={src} alt="img" className={imageStyles.image} />
		</div>
	);
};

export default ImagePreview;
