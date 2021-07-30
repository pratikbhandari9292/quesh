import React from "react";

import styles from "./spinner.module.scss";

const Spinner = ({ color = "black" }) => {
	return (
		<div
			className={`${styles.spinner} ${
				color === "white" && styles.spinnerWhite
			} ${color === "grey" && styles.spinnerGrey}`}
		></div>
	);
};

export default Spinner;
