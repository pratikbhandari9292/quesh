import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import groupHeaderStyles from "../group-header.module.scss";

import DropdownMenu from "../../dropdown-menu/dropdown-menu";
import DropdownItem from "../../dropdown-item/dropdown-item";

import { ReactComponent as HorizontalDotsIcon } from "../../../assets/icons/horizontal-dots.svg";

const GroupMenu = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const history = useHistory();
	const params = useParams();

	const groupID = params.id;

	const handleDotsIconClick = () => {
		setShowDropdown(!showDropdown);
	};

	const handleViewMembersClick = () => {
		history.push(`/group/${groupID}/members`);
	};

	return (
		<div
			className={groupHeaderStyles.iconContainer}
			onClick={handleDotsIconClick}
		>
			<HorizontalDotsIcon />

			<DropdownMenu show={showDropdown} indicator="right">
				<DropdownItem clickHandler={handleViewMembersClick}>
					view members
				</DropdownItem>
			</DropdownMenu>
		</div>
	);
};

export default GroupMenu;
