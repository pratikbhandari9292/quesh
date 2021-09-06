import React, { useState } from "react";

import styles from "./content-sort.module.scss";

import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const ContentSort = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [options, setOptions] = useState([
		{
			option: "time",
			title: "created time",
			active: true,
		},
		{
			option: "vote",
			title: "votes",
			active: false,
		},
	]);

	const handleSortClick = () => {
		setShowDropdown(!showDropdown);
	};

	const selectOption = (option) => {
		setShowDropdown(false);

		setOptions(
			options.map((optionItem) => {
				if (optionItem.option === option) {
					return { ...optionItem, active: true };
				}

				return { ...optionItem, active: false };
			})
		);
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.sort} ${
					showDropdown && styles.sortActive
				}`}
				onClick={handleSortClick}
			>
				Sort by <SortIcon className={styles.icon} />
			</div>

			<DropdownMenu show={showDropdown}>
				{options.map((option) => {
					return (
						<DropdownItem
							active={option.active}
							key={option.option}
							clickHandler={() => selectOption(option.option)}
						>
							{option.title}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</div>
	);
};

export default ContentSort;
