import React from "react";
import { useParams } from "react-router-dom";

import styles from "./user-card.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import ProfilePicture from "../profile-picture/profile-picture";
import RequestControls from "./request-controls/request-controls";
import SelectControl from "./select-control/select-control";
import UserMenu from "./user-menu/user-menu";

const UserCard = ({ userID, username, email, groups, type }) => {
	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const renderUserControls = () => {
		switch (type) {
			case "join-request":
				return <RequestControls userID={userID} />;
			case "select":
				return (
					<SelectControl
						user={{ userID, username, email, groups }}
						groupID={groupID}
					/>
				);
			default:
				return null;
		}
	};

	const renderUserMenu = () => {
		if (currentUser._id !== userID) {
			return <UserMenu />;
		}
	};

	return (
		<div className={styles.userCard}>
			<div className={styles.user}>
				<ProfilePicture username={username} />
				<div className={styles.userInfo}>
					<p className={styles.username}>{username}</p>
					<p className={styles.email}>{email}</p>
				</div>
			</div>

			{/* {type === "menu" && renderUserMenu()} */}

			{type && (
				<div className={styles.controls}>{renderUserControls()}</div>
			)}
		</div>
	);
};

export default UserCard;
