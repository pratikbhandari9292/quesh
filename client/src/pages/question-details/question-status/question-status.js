import React, { useState } from "react";

import styles from "./question-status.module.scss";

import { capitalizeFirstLetter } from "../../../utils/utils.strings";
import { getCurrentUser } from "../../../local-storage/current-user";

import { ReactComponent as ArrowRightIcon } from "../../../assets/icons/arrow-right.svg";

const StatusItem = ({ children, btnTexts = [] }) => {
	return (
		<div className={styles.questionStatus}>
			{children}

			{btnTexts.map((btnText) => {
				if (btnText) {
					return (
						<button className={styles.statusButton} key={btnText}>
							{capitalizeFirstLetter(btnText)} <ArrowRightIcon />
						</button>
					);
				}

				return null;
			})}
		</div>
	);
};

const QuestionStatus = ({ solution, proposedSolutions, groupID, owner }) => {
	const currentUser = getCurrentUser();

	const [isOwner, setIsOwner] = useState(currentUser._id === owner._id);

	const renderProposedSolutionStatus = () => {
		const onlyOne = proposedSolutions.length === 1;
		const proposedSolutionsExist = proposedSolutions.length > 0;

		return (
			<StatusItem
				btnTexts={[
					proposedSolutionsExist &&
						`view proposed ${onlyOne ? "solution" : "solutions"}`,
					!isOwner && "propose solution",
				]}
			>
				{`there ${onlyOne ? "is" : "are"} ${
					proposedSolutions.length || "no"
				} proposed ${onlyOne ? "solution" : "solutions"}`}
			</StatusItem>
		);
	};

	return (
		<div className={styles.container}>
			{!solution && (
				<StatusItem btnTexts={isOwner ? ["solve question"] : []}>
					this question has not been solved yet
				</StatusItem>
			)}

			{renderProposedSolutionStatus()}
		</div>
	);
};

export default QuestionStatus;
