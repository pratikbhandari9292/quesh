import React from "react";

import styles from "./image-list.module.scss";

import ContentImage from "../content-image/content-image";
import PageHeader from "../page-header/page-header";

const ImageList = ({ list, title }) => {
	const listStyles = {
		gridTemplateColumns: `repeat(auto-fit, 30rem)`,
	};

	if (list.length === 0) {
		return null;
	}

	return (
		<React.Fragment>
			<PageHeader
				title={`${title} - ${list.length}`}
				capFirst
				muted
				backArrow={false}
			/>

			<div className={styles.container} style={listStyles}>
				{list.map((image, index) => {
					return (
						<ContentImage
							src={image}
							index={index}
							images={list}
							key={image}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default ImageList;
