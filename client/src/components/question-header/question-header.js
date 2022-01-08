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

	useEffect(() => {
		if (!activeQuestion) {
			return;
		}

		const titleSection = getTitleSection();

		setQuestionTitle(
			`${titleSection} - ${capitalizeFirstLetter(
				title || `${username}'s question`
			)}`
		);
	}, [location, activeQuestion]);

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
			return "Propose solution";
		}

		if (location.pathname.includes("proposed-solutions")) {
			return "Proposed solutions";
		}

		if (location.pathname.includes("edit")) {
			if (location.pathname.includes("solution")) {
				return "Edit solution";
			}
			return "Edit question";
		}

		return "Question";
	};

	if (!activeQuestion) {
		return null;
	}

	const {
		questionID,
		title,
		author: { username, _id: authorID },
		group
	} = activeQuestion;

	return (
		<ContentHeader title={questionTitle}>
			<IconContainer>
				<QuestionMenu
					authorID={authorID}
					currentUserID={currentUser._id}
					token={currentUser.token}
					groupOwnerID = { group.owner }
				/>
			</IconContainer>
		</ContentHeader>
	);
};

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.activeContent.activeQuestion,
	};
};

export default connect(mapStateToProps)(QuestionHeader);
