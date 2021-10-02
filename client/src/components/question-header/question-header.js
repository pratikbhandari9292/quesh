import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/utils.strings";
import { getCurrentUser } from "../../local-storage/current-user";

import ContentHeader from "../content-header/content-header";
import IconContainer from "../icon-container/icon-container";
import QuestionMenu from "./question-menu/question-menu";

const QuestionHeader = ({ activeQuestion }) => {
	const [questionTitle, setQuestionTitle] = useState("");

	const location = useLocation();

	const currentUser = getCurrentUser();

	const {
		questionID,
		title,
		author: { username, _id: authorID },
	} = activeQuestion;

	useEffect(() => {
		const titleSection = getTitleSection();

		setQuestionTitle(
			`${titleSection} - ${capitalizeFirstLetter(
				title || `${username}'s question`
			)}`
		);
	}, [location]);

	useEffect(() => {
		document.title = questionTitle;
	}, [questionTitle]);

	const getTitleSection = () => {
		if (location.pathname.includes("solve")) {
			return "Solve";
		}

		if (
			location.pathname.includes("propose") &&
			!location.pathname.includes("proposed-solutions")
		) {
			return "Propose";
		}

		if (location.pathname.includes("proposed-solutions")) {
			return "Proposed solutions";
		}

		return "Question";
	};

	return (
		<ContentHeader title={questionTitle}>
			<IconContainer>
				<QuestionMenu
					questionID={questionID}
					authorID={authorID}
					currentUserID={currentUser._id}
					token={currentUser.token}
				/>
			</IconContainer>
		</ContentHeader>
	);
};

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.groupQuestions.activeQuestion,
	};
};

export default connect(mapStateToProps)(QuestionHeader);
