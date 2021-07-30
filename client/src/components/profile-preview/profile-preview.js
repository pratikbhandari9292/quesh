import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./profile-preview.module.scss";

import { setCurrentUser as setCurrentUserRedux } from "../../redux/current-user/current-user.actions";
import { setGroups, setMemQues } from "../../redux/groups/groups.actions";

import { setCurrentUser } from "../../local-storage/current-user";

import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down.svg";

import ProfilePicture from "../profile-picture/profile-picture";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const ProfilePreview = ({ username }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const dispatch = useDispatch();

	const history = useHistory();

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleSignOutButtonClick = () => {
		dispatch(setCurrentUserRedux(false));
		dispatch(setGroups([]));
		dispatch(setMemQues([]));
		setCurrentUser(null);
		history.push("/signin");
	};

	return (
		<div className={styles.container}>
			<div className={styles.preview} onClick={toggleDropdown}>
				<ProfilePicture username={username} />
				<span className={styles.username}>{username}</span>
				<ChevronDownIcon className={styles.icon} />
			</div>
			{showDropdown && (
				<DropdownMenu clickHandler={toggleDropdown}>
					<DropdownItem clickHandler={handleSignOutButtonClick}>
						sign out
					</DropdownItem>
				</DropdownMenu>
			)}
		</div>
	);
};

export default ProfilePreview;
