import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./logo.module.scss";

import { ReactComponent as LogoIcon } from "../../assets/logo/logo.svg";

const Logo = () => {
	const history = useHistory();

	const handleLogoClick = () => {
		history.push("/");
	};

	return (
		<div className={styles.container} onClick={handleLogoClick}>
			<LogoIcon className={styles.logoIcon} />{" "}
			<span className={styles.logoText}>Quesh</span>
		</div>
	);
};

export default Logo;
