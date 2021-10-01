import React from "react";

import styles from "./tag.module.scss";

const Tag = ({ text, color, muted, transparent, size, capitalize }) => {
	return (
		<div
			className={`${styles.container} ${
				color === "red" && styles.containerRed
			} ${transparent && styles.containerTransparent} ${
				size === "bigger" && styles.containerBigger
			} ${capitalize && styles.textCapitalized}`}
		>
			{text}
		</div>
	);
};

export default Tag;
