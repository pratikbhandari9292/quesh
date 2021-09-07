import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import styles from "./question-card.module.scss";

import { updateGroupQuestion } from "../../redux/group-questions/group-questions.actions";

import { getHowLongAgo } from "../../utils/utils.date-time";
import { updateQuestion } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";

import { ReactComponent as UpvoteIcon } from "../../assets/icons/upvote.svg";

import UserPreview from "../user-preview/user-preview";

const QuestionCard = ({
	questionID,
	author: { username, _id: authorID },
	createdAt,
	title,
	description,
	votes,
	votesNumber,
	sortBy,
}) => {
	const [voted, setVoted] = useState(false);
	const [voting, setVoting] = useState(false);
	const [canVote, setCanVote] = useState(false);

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

	useEffect(() => {
		setVoted(votes.find((vote) => vote === currentUser._id));
		setCanVote(currentUser._id !== authorID);
	}, []);

	const handleUpvoteClick = async () => {
		if (!canVote) {
			return;
		}

		if (voted || voting) {
			return;
		}

		try {
			setVoting(true);

			const result = await updateQuestion(
				questionID,
				{
					votes: [...votes, currentUser._id],
					votesNumber: votesNumber + 1,
				},
				currentUser.token
			);

			if (result.error) {
				return;
			}

			setVoted(true);
			dispatch(
				updateGroupQuestion(questionID, {
					votes: [...votes, currentUser._id],
					votesNumber: votes.length + 1,
				})
			);
		} catch (error) {
		} finally {
			setVoting(false);
		}
	};

	const renderVoteContainer = () => {
		if (sortBy !== "vote") {
			return null;
		}

		return (
			<div className={styles.voteContainer}>
				<UpvoteIcon
					className={`${styles.icon} ${voted && styles.iconActive} ${
						!canVote && styles.iconDeactivated
					}`}
					onClick={handleUpvoteClick}
				/>
				<p className={voted ? styles.votesActive : styles.votes}>
					{votes.length || 0}
				</p>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.question}>
				<div className={styles.header}>
					<UserPreview username={username} profileSize="smaller" />
					<p className={styles.date}>{getHowLongAgo(createdAt)}</p>
				</div>

				<div className={styles.body}>
					{title && <p className={styles.title}>{title}</p>}
					<p className={styles.description}>{description}</p>
				</div>
			</div>

			{renderVoteContainer()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		sortBy: state.groupQuestions.sortBy,
	};
};

export default connect(mapStateToProps)(QuestionCard);
