import React from "react";

import styles from "./post-details.module.scss";

import { getDate, getHowLongAgo } from "../../utils/utils.date-time";

import ProfilePicture from "../profile-picture/profile-picture";
import UserPreview from "../user-preview/user-preview";

const PostDetails = ({
	author,
	createdAt,
	description,
	voteContainer,
	type = "solution",
	menu,
}) => {
	const { username, avatar, _id: authorID } = author;

	return (
		<div className={styles.container}>
			<div className={styles.previewContainer}>
				<UserPreview
					username={username}
					subInfo={`posted ${getHowLongAgo(createdAt)} ago on
						${getDate(createdAt)}`}
					userID={authorID}
					avatar={avatar}
				/>

				{menu}
			</div>

			<div className={styles.postDescription}>
				{description}

				{voteContainer}
			</div>
		</div>
	);
};

export default PostDetails;
