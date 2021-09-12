import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./user-menu.module.scss";

import { displayAlert } from "../../../redux/alert/alert.actions";
import { resetModal, setModal } from "../../../redux/modal/modal.actions";
import { removeGroupMember as removeGroupMemberRedux } from "../../../redux/group-members/group-members.actions";

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
			setModal(
				true,
				"are you sure you want to remove this member ?",
				null,
				true,
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
					dispatch(displayAlert("not authorized", false));
				}
				return;
			}

			dispatch(removeGroupMemberRedux(userID));
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
