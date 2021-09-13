import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { displayMenu } from "../../redux/menu/menu.actions";

import styles from "./dropdown-menu.module.scss";

const DropdownMenu = ({
	show,
	position,
	color,
	indicator = "top",
	indicatorColor,
	children,
	clickHandler,
	showMenu,
}) => {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (show) {
	// 		dispatch(displayMenu());
	// 	}
	// }, [show]);

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

const mapStateToProps = (state) => {
	return {
		showMenu: state.menu.showMenu,
	};
};

export default connect(mapStateToProps)(DropdownMenu);
