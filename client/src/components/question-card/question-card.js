import React from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import styles from "./question-card.module.scss";

import { setActiveQuestion } from "../../redux/group-questions/group-questions.actions";

import { getHowLongAgo } from "../../utils/utils.date-time";

import UserPreview from "../user-preview/user-preview";
import VoteContainer from "../vote-container/vote-container";
import Tag from "../tag/tag";

const QuestionCard = (props) => {
	const {
		questionID,
		author,
		createdAt,
		title,
		description,
		votes,
		votesNumber,
		sortBy,
		solution,
		proposedSolutions,
	} = props;

	const dispatch = useDispatch();

	const history = useHistory();
	const params = useParams();

	const groupID = params.id;

	const { username, _id: authorID, avatar } = author;

	const handleContainerClick = () => {
		dispatch(setActiveQuestion(props));
		history.push(`/group/${groupID}/question/${questionID}`);
	};

	const renderVoteContainer = () => {
		if (sortBy !== "vote") {
			return null;
		}

		return (
			<VoteContainer
				votes={votes}
				votesNumber={votesNumber}
				author={author}
				questionID={questionID}
			/>
		);
	};

	const renderTags = () => {
		let tags = [];

		if (solution) {
			tags = [...tags, { text: "solved" }];
		} else {
			tags = [
				...tags,
				{ text: "unsolved", color: "red", type: "failure" },
			];
		}

		if (proposedSolutions.length > 0) {
			tags = [
				...tags,
				{
					text: "proposed",
					color: "grey",
					type: "progress",
				},
			];
		}

		return (
			<div className={styles.tags}>
				{tags.map((tag) => {
					return (
						<Tag
							text={tag.text}
							color={tag.color}
							type={tag.type}
							key={tag.text}
						/>
					);
				})}
			</div>
		);
	};

	return (
		<div className={styles.container} onClick={handleContainerClick}>
			<div className={styles.question}>
				<div className={styles.header}>
					<UserPreview username={username} avatar={avatar} />
					<p className={styles.date}>{getHowLongAgo(createdAt)}</p>
				</div>

				<div className={styles.body}>
					{title && <p className={styles.title}>{title}</p>}
					<p className={styles.description}>{description}</p>
				</div>

				{renderTags()}
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
