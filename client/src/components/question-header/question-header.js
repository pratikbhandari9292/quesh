import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { capitalizeFirstLetter } from "../../utils/utils.strings";
import { getCurrentUser } from "../../local-storage/current-user";

import ContentHeader from "../content-header/content-header";
import IconContainer from "../icon-container/icon-container";
import QuestionMenu from "./question-menu/question-menu";

const QuestionHeader = ({ activeQuestion }) => {
	const [questionTitle, setQuestionTitle] = useState("");

	const currentUser = getCurrentUser();

	const {
		questionID,
		title,
		author: { username, _id: authorID },
	} = activeQuestion;

	useEffect(() => {
		setQuestionTitle(
			capitalizeFirstLetter(title || `${username}'s question`)
		);
	}, []);

	useEffect(() => {
		document.title = `Question - ${questionTitle}`;
	}, [questionTitle]);

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
