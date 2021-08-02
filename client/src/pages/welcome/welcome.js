import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "./welcome.module.scss";

import Button from "../../components/button/button";

const Welcome = () => {
	const history = useHistory();

	useEffect(() => {
		document.title = "Welcome";
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Welcome to Quesh</h1>
			<h2 className={styles.subHeading}>
				Create Groups and Ask Questions
			</h2>

			<p className={styles.text}>
				Create a group with your friends and appoint an owner (one of
				your friends or your tutor). Ask questions and your friends or
				the owner will give you the solution. Get notifications within
				the app and through emails.
			</p>

			<div className={styles.buttons}>
				<Button
					color="blue"
					clickHandler={() => {
						history.push("/register");
					}}
				>
					create account
				</Button>
				<Button
					type="secondary"
					clickHandler={() => {
						history.push("/signin");
					}}
				>
					sign in
				</Button>
			</div>
		</div>
	);
};

export default Welcome;
