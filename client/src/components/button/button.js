import React from "react";

import styles from "./button.module.scss";

import Spinner from "../spinner/spinner";

const Button = ({
	children,
	type = "primary",
	color = "black",
	size,
	loading,
	disabled,
	clickHandler,
}) => {
	const getClassName = () => {
		let className = "";

		if (size === "full") {
			className += ` ${styles.buttonFull}`;
		}

		if (size === "smaller") {
			className += `${styles.buttonSmaller}`;
		}

		if (type === "primary") {
			if (color === "black") {
				className += ` ${styles.buttonPrimary}`;
			} else {
				className += ` ${styles.buttonPrimary} ${styles.buttonPrimaryBlue}`;
			}
		}

		if (type === "secondary") {
			if (color === "black") {
				className += ` ${styles.buttonPrimary} ${styles.buttonSecondary}`;
			} else {
				className += ` ${styles.buttonPrimary} ${styles.buttonSecondary} ${styles.buttonSecondaryBlue}`;
			}
		}

		if (disabled) {
			className = `${styles.buttonDisabled}`;
		}

		return className;
	};

	return (
		<button className={getClassName()} onClick={clickHandler}>
			{children} {loading && <Spinner />}
		</button>
	);
};

export default Button;
