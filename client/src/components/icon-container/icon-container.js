import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./icon-container.module.scss";

const IconContainer = ({ text, active, linkTo, children }) => {
	const history = useHistory();

	const handleContainerClick = () => {
		if (linkTo) {
			history.push(linkTo);
		}
	};

	return (
		<div
			className={`${styles.container} ${
				active && styles.containerActive
			}`}
			onClick={handleContainerClick}
		>
			{children}{" "}
			{text > 0 && (
				<p className={styles.text}>{text <= 99 ? text : "99+"}</p>
			)}
		</div>
	);
};

export default IconContainer;
