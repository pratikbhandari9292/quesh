import React from "react";

import styles from "./dot-indicator.module.scss";

const DotIndicator = () => {
	return (
		<div className={styles.container}>
			<div className={styles.dot}></div>
			<div className={styles.dot}></div>
			<div className={styles.dot}></div>
		</div>
	);
};

export default DotIndicator;
