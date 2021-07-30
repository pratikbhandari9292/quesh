import React from "react";

import styles from "./dropdown-item.module.scss";

const DropdownItem = ({ children, clickHandler }) => {
	return (
		<div className={styles.item} onClick={clickHandler}>
			{children}
		</div>
	);
};

export default DropdownItem;
