import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./group-questions.module.scss";

import {
	setGroupID,
	setGroupQuestions,
} from "../../redux/group-questions/group-questions.actions";

import { getGroupQuestions } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import CardsList from "../cards-list/cards-list";

const GroupQuestions = ({ questions, groupID, sortBy }) => {
	const [loadingQuestions, setLoadingQuestions] = useState(false);
	const [questionsMessage, setQuestionsMessage] = useState("");

	const params = useParams();

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	useEffect(() => {
		fetchGroupQuestions();
	}, [sortBy]);

	const fetchGroupQuestions = async () => {
		if (loadingQuestions) {
			return;
		}

		setLoadingQuestions(true);
		dispatch(setGroupID(params.id));

		try {
			const result = await getGroupQuestions(
				params.id,
				sortBy,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			if (result.questions.length === 0) {
				return setQuestionsMessage("no questions found");
			}

			dispatch(setGroupQuestions(result.questions, params.id));
			setQuestionsMessage("");
		} catch (error) {
		} finally {
			setLoadingQuestions(false);
		}
	};

	return (
		<div className={styles.container}>
			<CardsList
				list={questions}
				listMessage={questionsMessage}
				loadingList={loadingQuestions}
				type="question"
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		questions: state.groupQuestions.questions,
		groupID: state.groupQuestions.groupID,
		sortBy: state.groupQuestions.sortBy,
	};
};

export default connect(mapStateToProps)(GroupQuestions);
