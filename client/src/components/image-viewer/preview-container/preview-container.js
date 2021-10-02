import React from "react";

import styles from "./preview-container.module.scss";

import ImagePreview from "../image-preview/image-preview";

const PreviewContainer = ({ images, currentlyDisplayed }) => {
	return (
		<div className={styles.container}>
			{images.map((image, index) => {
				return (
					<ImagePreview
						src={image}
						index={index}
						active={currentlyDisplayed === index}
						key={image}
					/>
				);
			})}
		</div>
	);
};

export default PreviewContainer;
