import React from "react";

import styles from "./page-header.module.scss";

const PageHeader = ({ title, info, children }) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>
				{" "}
				{title} <span className={styles.info}>({info})</span>{" "}
			</p>
			{children}
		</div>
	);
};

export default PageHeader;
