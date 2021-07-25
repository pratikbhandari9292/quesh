import React from "react";
import { Link } from "react-router-dom";

import styles from "./form-header.module.scss";

const FormHeader = ({ heading, subheading, link, linkTo }) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>{heading}</h2>
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
