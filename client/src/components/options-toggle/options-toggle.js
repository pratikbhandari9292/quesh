import React, { useState } from "react";

import styles from "./options-toggle.module.scss";

import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const OptionsToggle = ({ options, selectHandler, type = "display", size }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const getActiveOption = () => {
		return options.find((option) => option.active).title;
	};

	const handleToggleClick = () => {
		setShowDropdown(!showDropdown);
	};

	return (
		<div
			className={`${styles.container} ${
				type === "sort" && styles.containerSort
			} ${
				showDropdown
					? type === "display"
						? styles.containerActive
						: styles.containerSortActive
					: null
			}`}
			onClick={handleToggleClick}
		>
			<DropdownMenu show={showDropdown}>
				{options.map((option) => {
					return (
						<DropdownItem
							key={option.option}
							active={option.active}
							clickHandler={() => selectHandler(option.option)}
						>
							{option.title}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
			<div className={styles.optionSelected}>
				{type === "display" ? (
					<React.Fragment>
						<p className={styles.text}>{getActiveOption()}</p>
						<ChevronDownIcon />
					</React.Fragment>
				) : (
					<React.Fragment>
						<p className={styles.text}>sort by</p> <SortIcon />
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default OptionsToggle;
