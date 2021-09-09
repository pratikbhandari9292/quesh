import React from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "./form-header.module.scss";

import { ReactComponent as BackArrow } from "../../assets/icons/arrow-left.svg";

const FormHeader = ({ heading, subheading, link, linkTo, backArrow }) => {
	const history = useHistory();

	const handleBackClick = () => {
		history.goBack();
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>{heading}</h2>
			{backArrow && (
				<BackArrow className={styles.icon} onClick={handleBackClick} />
			)}
			<p className={styles.subheading}>
				<span>{subheading}</span>{" "}
				<Link to={`/${linkTo}`} className={styles.link}>
					{link}
				</Link>
			</p>
		</div>
	);
};

export default FormHeader;
