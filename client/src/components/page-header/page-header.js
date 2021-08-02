import React from "react";

import styles from "./page-header.module.scss";

const PageHeader = ({
	title,
	info,
	term,
	bottomMargin,
	capitalize = true,
	size,
	align,
	color,
	children,
}) => {
	return (
		<div
			className={`${styles.container} ${
				align === "center" && styles.containerCentered
			}`}
		>
			<p
				className={`${styles.title} ${
					!capitalize && styles.nonCapitalized
				} ${size === "larger" && styles.titleLarger}  ${
					color === "muted" && styles.titleMuted
				}`}
			>
				{title}
				{info !== undefined && (
					<span className={styles.info}>({info})</span>
				)}
				{term && <span className={styles.term}>{term}</span>}
			</p>
			{children}
		</div>
	);
};

export default PageHeader;
