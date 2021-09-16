import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { capitalizeFirstLetter } from "../../utils/utils.strings";

import { ReactComponent as DotsIcon } from "../../assets/icons/horizontal-dots.svg";

import ContentHeader from "../content-header/content-header";
import IconContainer from "../icon-container/icon-container";

const QuestionHeader = ({ activeQuestion }) => {
	const [questionTitle, setQuestionTitle] = useState("");

	const {
		title,
		author: { username },
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
				<DotsIcon />
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
