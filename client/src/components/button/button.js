import React from "react";

import styles from "./button.module.scss";

import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down.svg";

import Spinner from "../spinner/spinner";

const Button = ({
	children,
	type = "primary",
	color = "black",
	size,
	loading,
	disabled,
	arrowDirection = "right",
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

		if (type === "tertiary") {
			className += `${styles.buttonTertiary}`;
		}

		if (disabled) {
			className = `${styles.buttonDisabled}`;
		}

		return className;
	};

	const renderArrowIcon = () => {
		switch (arrowDirection) {
			case "up":
				return <ArrowUpIcon />;
			case "down":
				return <ArrowDownIcon />;
			case "left":
				return <ArrowLeftIcon />;
			case "right":
				return <ArrowRightIcon />;
			default:
				return;
		}
	};

	return (
		<button className={getClassName()} onClick={clickHandler}>
			{children} {loading && <Spinner />}
			{type === "tertiary" && renderArrowIcon()}
		</button>
	);
};

export default Button;
