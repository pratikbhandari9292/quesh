import React from "react";
import { connect } from "react-redux";

import styles from "./question-details.module.scss";

import { getDate, getHowLongAgo } from "../../utils/utils.date-time";

import VoteContainer from "../../components/vote-container/vote-container";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import QuestionStatus from "./question-status/question-status";

const QuestionDetails = ({ activeQuestion, activeGroup }) => {
	const {
		description,
		author,
		createdAt,
		votes,
		votesNumber,
		questionID,
		solution,
		proposedSolutions,
	} = activeQuestion;

	const { username, avatar } = author;

	const { groupID, owner } = activeGroup;

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

			<div className={styles.questionDescription}>
				{description}
				<VoteContainer
					{...{ votes, votesNumber, author, questionID }}
				/>
			</div>

			<QuestionStatus
				{...{
					solution,
					proposedSolutions,
					groupID,
					owner,
				}}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.groupQuestions.activeQuestion,
		activeGroup: state.groups.activeGroup,
	};
};

export default connect(mapStateToProps)(QuestionDetails);
