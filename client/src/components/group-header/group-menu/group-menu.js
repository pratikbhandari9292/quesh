import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import groupHeaderStyles from "../group-header.module.scss";

import { resetModal, setModal } from "../../../redux/modal/modal.actions";
import { removeGroup } from "../../../redux/groups/groups.actions";
import { displayAlert } from "../../../redux/alert/alert.actions";

import {
	getCurrentUser,
	removeUserGroup,
} from "../../../local-storage/current-user";
import { leaveGroup } from "../../../api/api.group";

import { ReactComponent as HorizontalDotsIcon } from "../../../assets/icons/horizontal-dots.svg";

import DropdownMenu from "../../dropdown-menu/dropdown-menu";
import DropdownItem from "../../dropdown-item/dropdown-item";
import Spinner from "../../spinner/spinner";

const GroupMenu = ({ owner }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const history = useHistory();
	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

	const handleDotsIconClick = () => {
		setShowDropdown(!showDropdown);
	};

	const handleViewMembersClick = () => {
		history.push(`/group/${groupID}/members`);
	};

	const handleLeaveClick = () => {
		dispatch(
			setModal(
				true,
				"are you sure you want to leave the group ?",
				null,
				true,
				handleMemberLeave
			)
		);
	};

	const handleMemberLeave = async () => {
		dispatch(setModal(true, "leaving group...", <Spinner />, false));

		try {
			const result = await leaveGroup(groupID, currentUser.token);

			if (result.error) {
				return;
			}

			dispatch(removeGroup(groupID));
			removeUserGroup(groupID);
			dispatch(displayAlert("you have left the group"));
			history.push("/groups/me");
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
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

				{currentUser._id !== owner && (
					<DropdownItem type="danger" clickHandler={handleLeaveClick}>
						leave group
					</DropdownItem>
				)}
			</DropdownMenu>
		</div>
	);
};

export default GroupMenu;
