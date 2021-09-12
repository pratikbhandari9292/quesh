import React from "react";

import styles from "./dropdown-item.module.scss";

const DropdownItem = ({ active, type, children, clickHandler }) => {
	return (
		<div
			className={`${styles.item} ${active && styles.activeItem} ${
				type === "danger" && styles.itemDanger
			}`}
			onClick={clickHandler}
		>
			{children}
		</div>
	);
};

export default DropdownItem;
