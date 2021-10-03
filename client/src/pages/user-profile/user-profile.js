import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./user-profile.module.scss";

import { capitalizeFirstLetter } from "../../utils/utils.strings";

import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";

import PageHeader from "../../components/page-header/page-header";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import Button from "../../components/button/button";
import Tag from "../../components/tag/tag";

const UserProfile = ({ activeUser }) => {
	const history = useHistory();
	const { userID } = useParams();

	const currentUserProfile = userID === "me";

	const { username, email, avatar, groups } = activeUser;

	const title = currentUserProfile
		? "Your profile"
		: `${capitalizeFirstLetter(username)}'s profile`;

	useEffect(() => {
		document.title = title;
	}, []);

	return (
		<div>
			<PageHeader title={title} capFirst />

			<div className={styles.profileMain}>
				<div className={styles.avatarContainer}>
					<ProfilePicture
						avatar={avatar}
						size="bigger"
						expand={true}
						rounded={false}
					/>
				</div>

				<div className={styles.userInfo}>
					<p className={styles.username}>{username}</p>
					<p className={styles.email}>{email}</p>

					<Tag
						text={`associated groups ${groups.length}`}
						transparent
						size="bigger"
						capitalize
						type="none"
					/>

					<div className={styles.divider}></div>

					{currentUserProfile && (
						<Button
							size="smaller"
							type="secondary"
							clickHandler={() =>
								history.push("/profile/edit/me")
							}
						>
							<EditIcon /> edit profile
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeUser: state.currentUser.activeUser,
	};
};

export default connect(mapStateToProps)(UserProfile);
