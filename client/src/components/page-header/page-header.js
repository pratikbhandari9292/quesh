import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./page-header.module.scss";

import { capitalizeFirstLetter } from "../../utils/utils.strings";

import { ReactComponent as BackArrow } from "../../assets/icons/arrow-left.svg";

const PageHeader = ({
	title,
	info,
	term,
	bottomMargin,
	capitalize,
	capFirst,
	size,
	align,
	color,
	backArrow,
	children,
}) => {
	const history = useHistory();

	return (
		<div
			className={`${styles.container} ${
				align === "center" && styles.containerCentered
			}`}
		>
			<p
				className={`${styles.title} ${
					capitalize && styles.capitalized
				} ${size === "larger" && styles.titleLarger}  ${
					color === "muted" && styles.titleMuted
				}`}
			>
				{backArrow && (
					<BackArrow
						onClick={() => {
							history.goBack();
						}}
					/>
				)}

				{capFirst ? capitalizeFirstLetter(title) : title}

				{info !== undefined && (
					<span className={styles.info}>({info})</span>
				)}

				{term && <p className={styles.term}>{term}</p>}
			</p>
			{children}
		</div>
	);
};

export default PageHeader;
