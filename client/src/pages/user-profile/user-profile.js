import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "./user-profile.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";

import PageHeader from "../../components/page-header/page-header";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import Button from "../../components/button/button";
import Tag from "../../components/tag/tag";

const UserProfile = () => {
	const history = useHistory();

	const { username, email, avatar, groups } = getCurrentUser();

	useEffect(() => {
		document.title = "Your profile";
	}, []);

	return (
		<div>
			<PageHeader title="your profile" capitalize={true} />

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

					<Button
						size="smaller"
						type="secondary"
						clickHandler={() => history.push("/profile/edit")}
					>
						<EditIcon /> edit profile
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
