import React from "react";

import styles from "./dropdown-menu.module.scss";

const DropdownMenu = ({
	show,
	position,
	color,
	indicator = "top",
	indicatorColor,
	children,
	clickHandler,
}) => {
	if (!show) {
		return null;
	}

	return (
		<div
			className={`${styles.menu} ${
				position === "center" && styles.menuCenter
			} ${color === "light" && styles.menuLight}`}
			onClick={clickHandler}
		>
			<span
				className={`${styles.indicator} ${
					indicator === "right" && styles.indicatorRight
				}`}
			></span>
			{children}
		</div>
	);
};

export default DropdownMenu;
