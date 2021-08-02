import React from "react";

import styles from "./page-header.module.scss";

const PageHeader = ({
	title,
	info,
	bottomMargin,
	capitalize = true,
	children,
}) => {
	return (
		<div
			className={!bottomMargin ? styles.container : styles.marginSmaller}
		>
			<p className={capitalize ? styles.title : styles.nonCapitalized}>
				{title}
				{info !== undefined && (
					<span className={styles.info}>({info})</span>
				)}
			</p>
			{children}
		</div>
	);
};

export default PageHeader;
