import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./profile-preview.module.scss";

import { resetCurrentUser } from "../../redux/current-user/current-user.actions";
import { setGroups, setNeedToFetch } from "../../redux/groups/groups.actions";
import { resetAddMembers } from "../../redux/add-members/add-members.actions";
import {
	displayConfirmationModal,
	resetModal,
} from "../../redux/modal/modal.actions";

import { setCurrentUser } from "../../local-storage/current-user";

import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as SignOutIcon } from "../../assets/icons/sign-out.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";

import ProfilePicture from "../profile-picture/profile-picture";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const ProfilePreview = ({ username, email, avatar }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const dispatch = useDispatch();

	const history = useHistory();

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleSignOutButtonClick = () => {
		dispatch(
			displayConfirmationModal(
				"are you sure you want to sign out ?",
				signUserOut,
				true
			)
		);
	};

	const signUserOut = () => {
		dispatch(resetModal());
		dispatch(setGroups([]));
		dispatch(setNeedToFetch(true));
		dispatch(resetCurrentUser());
		dispatch(resetAddMembers());
		setCurrentUser(null);
		history.push("/signin");
	};

	return (
		<div className={styles.container}>
			<div className={styles.preview} onClick={toggleDropdown}>
				<ProfilePicture username={username} avatar={avatar} />
				<span className={styles.username}>{username}</span>
				<ChevronDownIcon className={styles.icon} />
			</div>

			<DropdownMenu show={showDropdown} clickHandler={toggleDropdown}>
				<DropdownItem clickHandler={() => history.push("/profile/me")}>
					<UserIcon /> view profile
				</DropdownItem>
				<DropdownItem
					type="danger"
					clickHandler={handleSignOutButtonClick}
				>
					<SignOutIcon /> sign out
				</DropdownItem>
			</DropdownMenu>
		</div>
	);
};

export default ProfilePreview;
