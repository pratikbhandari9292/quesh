import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./header.module.scss";
import wrapperStyles from "../../styles/wrapper.module.scss";

import Logo from "../logo/logo";
import Button from "../button/button";

const Header = () => {
	const history = useHistory();

	const handleSignInButtonClick = () => {
		history.push("/signin");
	};

	return (
		<div className={styles.container}>
			<div className={`${wrapperStyles.wrapper} ${styles.wrapper}`}>
				<Logo />
				<Button type="secondary" clickHandler={handleSignInButtonClick}>
					Sign In
				</Button>
			</div>
		</div>
	);
};

export default Header;
