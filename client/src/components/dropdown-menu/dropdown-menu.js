import React from "react";

import styles from "./dropdown-menu.module.scss";

const DropdownMenu = ({ children, clickHandler }) => {
	return (
		<div className={styles.menu} onClick={clickHandler}>
			{children}
		</div>
	);
};

export default DropdownMenu;
