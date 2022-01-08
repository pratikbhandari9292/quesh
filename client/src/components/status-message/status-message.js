import React from "react";

import styles from "./status-message.module.scss";

import Spinner from "../spinner/spinner";

const LoadingMessage = ({ message, spinner = true, align, top }) => {
	return (
		<div
			className={`${styles.container} ${
				align === "left" && styles.containerLeft
			} ${ top && styles.containerMarginTop }`}
		>
			<p className={styles.message}>{message}</p>
			{spinner && <Spinner color="grey" />}
		</div>
	);
};

export default LoadingMessage;
