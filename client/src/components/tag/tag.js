import React from "react";

import styles from "./tag.module.scss";

import { ReactComponent as TickCircleIcon } from "../../assets/icons/tick-circle.svg";
import { ReactComponent as CrossCircleIcon } from "../../assets/icons/cross-circle.svg";
import { ReactComponent as PendingIcon } from "../../assets/icons/pending.svg";

const Tag = ({
	text,
	color,
	transparent,
	size,
	capitalize,
	type = "success",
}) => {
	const renderIcon = () => {
		switch (type) {
			case "success":
				return <TickCircleIcon />;
			case "failure":
				return <CrossCircleIcon />;
			case "progress":
				return <PendingIcon />;
			default:
				return;
		}
	};

	return (
		<div
			className={`${styles.container} ${
				color === "grey" && styles.containerGrey
			} ${color === "muted" && styles.containerMuted} ${
				transparent && styles.containerTransparent
			} ${color === "red" && styles.containerRed} ${
				size === "bigger" && styles.containerBigger
			} ${capitalize && styles.textCapitalized}`}
		>
			{renderIcon()} {text}
		</div>
	);
};

export default Tag;
