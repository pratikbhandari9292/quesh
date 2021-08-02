import React from "react";

import styles from "./group-info.module.scss";

const GroupInfo = ({ title, children }) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<div className={styles.info}>{children}</div>
		</div>
	);
};

export default GroupInfo;
