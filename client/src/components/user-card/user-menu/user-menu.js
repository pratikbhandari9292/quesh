import React, { useState } from "react";

import styles from "./user-menu.module.scss";

import { ReactComponent as HorizontalDotsIcon } from "../../../assets/icons/horizontal-dots.svg";

import DropdownMenu from "../../../components/dropdown-menu/dropdown-menu";
import DropdownItem from "../../../components/dropdown-item/dropdown-item";

const UserMenu = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const handleDotsIconClick = () => {
		setShowDropdown(!showDropdown);
	};

	return (
		<div className={styles.container}>
			<HorizontalDotsIcon
				className={styles.icon}
				onClick={handleDotsIconClick}
			/>

			<DropdownMenu show={showDropdown} position="center">
				<DropdownItem>remove user</DropdownItem>
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
