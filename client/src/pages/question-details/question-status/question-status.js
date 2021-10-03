import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import styles from "./question-status.module.scss";

import { getCurrentUser } from "../../../local-storage/current-user";

import Button from "../../../components/button/button";

const StatusItem = ({ text, children, btnTexts = [] }) => {
	return (
		<div className={styles.questionStatus}>
			{text}
			{children}
		</div>
	);
};

const StatusButton = ({ children, clickHandler }) => {
	return (
		<div className={styles.statusButton}>
			<Button type="tertiary" clickHandler={clickHandler}>
				{children}
			</Button>
		</div>
	);
};

const QuestionStatus = ({
	solution,
	proposedSolutions,
	owner,
	scrollToSolution,
}) => {
	const { groupID, questionID } = useParams();
	const history = useHistory();

	const currentUser = getCurrentUser();

	const [isOwner, setIsOwner] = useState(currentUser._id === owner._id);

	const renderProposedSolutionStatus = () => {
		const onlyOne = proposedSolutions.length === 1;
		const proposedSolutionsExist = proposedSolutions.length > 0;

		return (
			<StatusItem
				text={`there ${onlyOne ? "is" : "are"} ${
					proposedSolutions.length || "no"
				} proposed ${onlyOne ? "solution" : "solutions"}`}
			>
				{proposedSolutionsExist && (
					<StatusButton
						clickHandler={() =>
							history.push(
								`/group/${groupID}/question/${questionID}/proposed-solutions`
							)
						}
					>
						view proposed {onlyOne ? "solution" : "solutions"}
					</StatusButton>
				)}
				{!isOwner && (
					<StatusButton
						clickHandler={() =>
							history.push(
								`/group/${groupID}/question/${questionID}/propose`
							)
						}
					>
						propose solution
					</StatusButton>
				)}
			</StatusItem>
		);
	};

	const renderSolutionStatus = () => {
		return !solution ? (
			<StatusItem
				text="this question has not been solved yet"
				btnTexts={isOwner ? ["solve question"] : []}
			>
				{isOwner && (
					<StatusButton
						clickHandler={() =>
							history.push(
								`/group/${groupID}/question/${questionID}/solve`
							)
						}
					>
						solve question
					</StatusButton>
				)}
			</StatusItem>
		) : (
			<StatusItem
				text="this question has been solved"
				btnTexts={["view solution"]}
			>
				<StatusButton clickHandler={scrollToSolution}>
					view solution
				</StatusButton>
			</StatusItem>
		);
	};

	return (
		<div className={styles.container}>
			{renderSolutionStatus()}

			{renderProposedSolutionStatus()}
		</div>
	);
};

export default QuestionStatus;
