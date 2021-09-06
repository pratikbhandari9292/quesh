import React from "react";

import styles from "./dropdown-item.module.scss";

const DropdownItem = ({ active, children, clickHandler }) => {
	return (
		<div
			className={`${styles.item} ${active && styles.activeItem}`}
			onClick={clickHandler}
		>
			{children}
		</div>
	);
};

export default DropdownItem;
