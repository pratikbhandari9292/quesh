import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./user-card.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import ProfilePicture from "../profile-picture/profile-picture";
import RequestControls from "./request-controls/request-controls";
import SelectControl from "./select-control/select-control";
import UserMenu from "./user-menu/user-menu";
import Tag from "../../components/tag/tag";

const UserCard = ({ userID, username, email, groups, type, reduxGroups }) => {
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

		const currentGroup = reduxGroups.find((group) => group._id === groupID);

		if (
			currentGroup.owner._id === userID ||
			currentGroup.owner === userID
		) {
			tags = [...tags, "owner"];
		}

		if (currentGroup.createdBy === userID) {
			tags = [...tags, "creator"];
		}

		if (tags.length === 0) {
			return null;
		}

		return (
			<div className={styles.tags}>
				{tags.map((tag) => {
					return <Tag text={tag} key={tag} />;
				})}
			</div>
		);
	};

	return (
		<div className={styles.userCard}>
			<div className={styles.user}>
				<ProfilePicture username={username} />
				<div className={styles.userInfo}>
					<p className={styles.username}>{username}</p>
					<p className={styles.email}>{email}</p>
					{renderUserTags()}
				</div>
			</div>

			{type === "menu" && renderUserMenu()}

			{type !== "menu" && (
				<div className={styles.controls}>{renderUserControls()}</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		reduxGroups: state.groups.groups,
	};
};

export default connect(mapStateToProps)(UserCard);
