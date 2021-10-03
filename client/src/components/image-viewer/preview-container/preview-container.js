import React from "react";

import styles from "./preview-container.module.scss";
import inputGroupStyles from "../../input-group/input-group.module.scss";

import ImagePreview from "../image-preview/image-preview";

const PreviewContainer = ({
	images,
	currentlyDisplayed,
	title,
	removeHandler,
	contentType,
	contentID,
}) => {
	return (
		<React.Fragment>
			{title && <p className={inputGroupStyles.label}>{title}</p>}
			<div className={styles.container}>
				{images.map((image, index) => {
					return (
						<ImagePreview
							src={image}
							index={index}
							active={currentlyDisplayed === index}
							{...{ removeHandler, contentType, contentID }}
							key={image}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default PreviewContainer;
