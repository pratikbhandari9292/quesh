import React from "react";

import styles from "./spinner.module.scss";

const Spinner = ({ color = "black", size }) => {
	return (
		<div
			className={`${styles.spinner} ${
				color === "white" && styles.spinnerWhite
			} ${color === "grey" && styles.spinnerGrey} ${
				size === "smaller" && styles.spinnerSmaller
			}`}
		></div>
	);
};

export default Spinner;
