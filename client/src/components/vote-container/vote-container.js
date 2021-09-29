import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";

import styles from "./vote-container.module.scss";

import {
	setActiveQuestion,
	updateGroupQuestion,
} from "../../redux/group-questions/group-questions.actions";

import { getCurrentUser } from "../../local-storage/current-user";
import { updateQuestion } from "../../api/api.question";

import { ReactComponent as UpvoteIcon } from "../../assets/icons/upvote.svg";

const VoteContainer = ({
	votes,
	votesNumber,
	author,
	questionID,
	activeQuestion,
}) => {
	const currentUser = getCurrentUser();

	const [voted, setVoted] = useState(
		votes.find((vote) => vote === currentUser._id)
	);
	const [voting, setVoting] = useState(false);
	const [canVote, setCanVote] = useState(currentUser._id !== author._id);

	const dispatch = useDispatch();

	const handleUpvoteClick = async (event) => {
		event.stopPropagation();

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

			const updateInfo = {
				votes: [...votes, currentUser._id],
				votesNumber: votes.length + 1,
			};

			setVoted(true);
			dispatch(updateGroupQuestion(questionID, updateInfo));

			if (activeQuestion) {
				dispatch(
					setActiveQuestion({ ...activeQuestion, ...updateInfo })
				);
			}
		} catch (error) {
		} finally {
			setVoting(false);
		}
	};

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

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.groupQuestions.activeQuestion,
	};
};

export default connect(mapStateToProps)(VoteContainer);
