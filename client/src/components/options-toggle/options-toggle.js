import React, { useState } from "react";

import styles from "./options-toggle.module.scss";

import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const OptionsToggle = ({ options, size }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div
			className={`${styles.container} ${
				size === "bigger" && styles.toggleBigger
			}`}
		>
			<DropdownMenu show={showDropdown}>
				{options.map((option) => {
					return <DropdownItem>{option}</DropdownItem>;
				})}
			</DropdownMenu>
			<p className={styles.type}>
				{options[0]} <ChevronDownIcon />
			</p>
		</div>
	);
};

export default OptionsToggle;
