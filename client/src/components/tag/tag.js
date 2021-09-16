import React from "react";

import styles from "./tag.module.scss";

const Tag = ({ text, color, muted }) => {
	return (
		<div
			className={`${styles.container} ${
				color === "red" && styles.containerRed
			}`}
		>
			{text}
		</div>
	);
};

export default Tag;
