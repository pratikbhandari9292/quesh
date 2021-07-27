import React from "react";

import styles from "./group.module.scss";

const Group = ({ title }) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
		</div>
	);
};

export default Group;
