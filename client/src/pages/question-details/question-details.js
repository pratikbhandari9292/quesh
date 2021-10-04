import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./question-details.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import VoteContainer from "../../components/vote-container/vote-container";
import QuestionStatus from "./question-status/question-status";
import ImageList from "../../components/image-list/image-list";
import Button from "../../components/button/button";
import PostDetails from "../../components/post-details/post-details";
import SolutionContainer from "../../components/solution-container/solution-container";

const QuestionDetails = ({ activeQuestion, activeGroup }) => {
	const [showSolution, setShowSolution] = useState(false);

	const dividerRef = useRef();

	const history = useHistory();

	const {
		description,
		author,
		createdAt,
		votes,
		votesNumber,
		questionID,
		solution,
		proposedSolutions,
		images,
		group,
	} = activeQuestion;

	const { _id: groupID, owner } = group;

	const currentUser = getCurrentUser();

	const renderCornerButton = () => {
		return (
			<div className={styles.buttonContainer}>
				{owner._id === currentUser._id ? (
					<Button color="blue" clickHandler={handleSolveClick}>
						solve
					</Button>
				) : (
					<Button color="blue" clickHandler={handleProposeClick}>
						propose
					</Button>
				)}
			</div>
		);
	};

	const handleSolveClick = () => {
		takeToSolve("solve");
	};

	const handleProposeClick = () => {
		takeToSolve("propose");
	};

	const takeToSolve = (type) => {
		history.push(`/group/${groupID}/question/${questionID}/${type}`);
	};

	const scrollToSolution = () => {
		if (!showSolution) {
			setShowSolution(true);
		}

		setTimeout(() => {
			dividerRef.current.scrollIntoView();
		}, 100);
	};

	return (
		<div className={styles.container}>
			<div className={styles.detailsMain}>
				<PostDetails
					{...{
						author,
						createdAt,
						description,
						voteContainer: (
							<VoteContainer
								{...{ votes, votesNumber, author, questionID }}
							/>
						),
					}}
				/>

				<QuestionStatus
					{...{
						solution,
						proposedSolutions,
						groupID,
						owner,
						scrollToSolution,
					}}
				/>
			</div>

			<ImageList list={images} title="question images" />

			<div className={styles.divider} ref={dividerRef}></div>

			{solution && showSolution && (
				<SolutionContainer solution={solution} approvedSolution />
			)}

			{renderCornerButton()}
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
