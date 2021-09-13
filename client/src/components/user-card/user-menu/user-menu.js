import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./user-menu.module.scss";

import { displayAlert } from "../../../redux/alert/alert.actions";
import {
	displayConfirmationModal,
	resetModal,
	setModal,
} from "../../../redux/modal/modal.actions";
import {
	removeGroupMember as removeGroupMemberRedux,
	resetGroupMembers,
} from "../../../redux/group-members/group-members.actions";
import { updateGroup } from "../../../redux/groups/groups.actions";

import { removeGroupMember } from "../../../api/api.group";

import { ReactComponent as HorizontalDotsIcon } from "../../../assets/icons/horizontal-dots.svg";

import DropdownMenu from "../../../components/dropdown-menu/dropdown-menu";
import DropdownItem from "../../../components/dropdown-item/dropdown-item";
import Spinner from "../../../components/spinner/spinner";

const UserMenu = ({ userID, groupID, token }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const dispatch = useDispatch();

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleRemoveClick = () => {
		toggleDropdown();

		dispatch(
			displayConfirmationModal(
				"are you sure you want to remove this member ?",
				handleMemberRemoval
			)
		);
	};

	const handleMemberRemoval = async () => {
		try {
			dispatch(setModal(true, "removing member...", <Spinner />, false));

			const result = await removeGroupMember(groupID, userID, token);

			if (result.error) {
				if (result.error === "unauthorized") {
					dispatch(
						displayAlert("you donot have the authorization", false)
					);
				}
				return;
			}

			dispatch(removeGroupMemberRedux(userID));
			dispatch(updateGroup(groupID, result.group));
			// dispatch(resetGroupMembers());
			dispatch(displayAlert("member removed"));
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	return (
		<div className={styles.container}>
			<HorizontalDotsIcon
				className={styles.icon}
				onClick={toggleDropdown}
			/>

			<DropdownMenu show={showDropdown} position="center" color="light">
				<DropdownItem clickHandler={handleRemoveClick}>
					remove user
				</DropdownItem>
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
