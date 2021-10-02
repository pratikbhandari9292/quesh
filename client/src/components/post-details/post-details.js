import React from "react";

import styles from "./post-details.module.scss";

import { getDate, getHowLongAgo } from "../../utils/utils.date-time";

import ProfilePicture from "../profile-picture/profile-picture";

const PostDetails = ({ author, createdAt, description, voteContainer }) => {
	const { username, avatar } = author;

	return (
		<div className={styles.container}>
			<div className={styles.userPreview}>
				<ProfilePicture
					username={username}
					avatar={avatar}
					size="smaller"
				/>
				<div className={styles.userPostInfo}>
					<p className={styles.previewUsername}>{username}</p>
					<p className={styles.postInfo}>
						posted {getHowLongAgo(createdAt)} ago on{" "}
						{getDate(createdAt)}
					</p>
				</div>
			</div>

			<div className={styles.postDescription}>
				{description}

				{voteContainer}
			</div>
		</div>
	);
};

export default PostDetails;
