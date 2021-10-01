import React, { useState } from "react";

import { ReactComponent as HorizontalDotsIcon } from "../../assets/icons/horizontal-dots.svg";

import DropdownMenu from "../dropdown-menu/dropdown-menu";

const DotMenu = ({ indicator, children }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const handleMenuClick = () => {
		setShowDropdown(!showDropdown);
	};

	return (
		<div onClick={handleMenuClick}>
			<HorizontalDotsIcon />

			<DropdownMenu show={showDropdown} indicator={indicator}>
				{children}
			</DropdownMenu>
		</div>
	);
};

export default DotMenu;
