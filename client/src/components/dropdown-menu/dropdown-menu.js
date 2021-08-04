import React from "react";

import styles from "./dropdown-menu.module.scss";

const DropdownMenu = ({ show, children, clickHandler }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={styles.menu} onClick={clickHandler}>
			{children}
		</div>
	);
};

export default DropdownMenu;
