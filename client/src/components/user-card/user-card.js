import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./user-card.module.scss";

import { setActiveUser } from "../../redux/current-user/current-user.actions";

import { getCurrentUser } from "../../local-storage/current-user";

import ProfilePicture from "../profile-picture/profile-picture";
import RequestControls from "./request-controls/request-controls";
import SelectControl from "./select-control/select-control";
import UserMenu from "./user-menu/user-menu";
import Tag from "../../components/tag/tag";
import OwnershipControl from "./ownership-control/ownership-control";

const UserCard = ({
	userID,
	username,
	email,
	groups,
	avatar,
	type,
	reduxGroups,
}) => {
	const params = useParams();
	const location = useLocation();
	const history = useHistory();

	const dispatch = useDispatch();

	const groupID = params.id;

	const [currentGroup, setCurrentGroup] = useState(
		reduxGroups.find((group) => group._id === groupID)
	);

	const currentUser = getCurrentUser();

	const renderUserControls = () => {
		switch (type) {
			case "join-request":
				return (
					<div className={styles.controls}>
						<RequestControls userID={userID} />
					</div>
				);
			case "select":
				return (
					<div className={styles.controls}>
						<SelectControl
							user={{ userID, username, email, avatar, groups }}
							groupID={groupID}
						/>
					</div>
				);
			case "delegate-ownership":
				return (
					<OwnershipControl
						userID={userID}
						username={username}
						currentGroup={currentGroup}
					/>
				);
			default:
				return null;
		}
	};

	const renderUserMenu = () => {
		if (currentUser._id !== userID) {
			return (
				<UserMenu
					userID={userID}
					groupID={groupID}
					token={currentUser.token}
				/>
			);
		}
	};

	const renderUserTags = () => {
		let tags = [];

		if (currentGroup.owner._id === userID) {
			tags = [...tags, "owner"];
		}

		if (currentGroup.createdBy === userID) {
			tags = [...tags, "creator"];
		}

		if (
			location.pathname.includes("/members") &&
			groups.find((group) => group._id === groupID).addedBy ===
				currentUser._id
		) {
			tags = [...tags, "added by me"];
		}

		if (tags.length === 0) {
			return null;
		}

		return (
			<div className={styles.tags}>
				{tags.map((tag) => {
					return <Tag text={tag} key={tag} type="none" />;
				})}
			</div>
		);
	};

	const handleUserClick = () => {
		// const currentUserCard = currentUser._id === userID;
		// dispatch(
		// 	setActiveUser(
		// 		currentUserCard
		// 			? currentUser
		// 			: { username, email, avatar, groups }
		// 	)
		// );
		// history.push(`/profile/${currentUserCard ? "me" : userID}`);
	};

	return (
		<div className={styles.userCard} id="container">
			<div className={styles.user} onClick={handleUserClick}>
				<ProfilePicture username={username} avatar={avatar} />
				<div className={styles.userInfo}>
					<p className={styles.username}>{username}</p>
					<p className={styles.email}>{email}</p>
					{renderUserTags()}
				</div>
			</div>

			{type === "menu" && renderUserMenu()}

			{type !== "menu" && renderUserControls()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		reduxGroups: state.groups.groups,
	};
};

export default connect(mapStateToProps)(UserCard);
