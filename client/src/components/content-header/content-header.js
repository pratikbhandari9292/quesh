import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./content-header.module.scss";

import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";

const ContentHeader = ({ title, children }) => {
	const history = useHistory();

	return (
		<div className={styles.container}>
			<div className={styles.titleContainer}>
				<ArrowLeftIcon
					className={styles.icon}
					onClick={() => {
						history.goBack();
					}}
				/>
				<p className={styles.title}>{title}</p>
			</div>
			<div className={styles.controls}>{children}</div>
		</div>
	);
};

export default ContentHeader;
