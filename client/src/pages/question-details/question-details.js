import React from "react";
import { connect } from "react-redux";

import styles from "./question-details.module.scss";

import { getDate, getHowLongAgo } from "../../utils/utils.date-time";
import { capitalizeFirstLetter } from "../../utils/utils.strings";

import VoteContainer from "../../components/vote-container/vote-container";
import ProfilePicture from "../../components/profile-picture/profile-picture";

const QuestionDetails = ({ activeQuestion }) => {
	const {
		title,
		description,
		author,
		createdAt,
		votes,
		votesNumber,
		questionID,
	} = activeQuestion;

	const { username } = author;

	return (
		<div className={styles.container}>
			{/* {title && <p className={styles.questionTitle}>{title}</p>} */}
			<div className={styles.userPreview}>
				<ProfilePicture username={username} size="smaller" />
				<p className={styles.previewUsername}>{username}</p>
			</div>

			<p className={styles.postInfo}>
				posted {getHowLongAgo(createdAt)} ago on {getDate(createdAt)}
			</p>

			<div className={styles.questionDescription}>
				{description}
				<VoteContainer
					{...{ votes, votesNumber, author, questionID }}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.groupQuestions.activeQuestion,
	};
};

export default connect(mapStateToProps)(QuestionDetails);
