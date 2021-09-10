import React from "react";

import styles from "./dropdown-menu.module.scss";

const DropdownMenu = ({ show, indicator = "top", children, clickHandler }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={styles.menu} onClick={clickHandler}>
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
