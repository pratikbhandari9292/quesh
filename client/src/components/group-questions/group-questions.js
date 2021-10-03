import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./group-questions.module.scss";

import {
	setGroupQuestions,
	setNeedToFetch,
} from "../../redux/group-questions/group-questions.actions";

import { getGroupQuestions } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import CardsList from "../cards-list/cards-list";

const GroupQuestions = ({
	questions,
	groupID,
	sortBy,
	displayType,
	needToFetch,
}) => {
	const [loadingQuestions, setLoadingQuestions] = useState(false);
	const [questionsMessage, setQuestionsMessage] = useState("");

	const params = useParams();

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	useEffect(() => {
		if (needToFetch) {
			fetchGroupQuestions();
		}
	}, [needToFetch]);

	const fetchGroupQuestions = async () => {
		if (loadingQuestions) {
			return;
		}

		setLoadingQuestions(true);

		try {
			const result = await getGroupQuestions(
				params.id,
				sortBy,
				displayType,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			dispatch(setNeedToFetch(false));

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
		displayType: state.groupQuestions.displayType,
		needToFetch: state.groupQuestions.needToFetch,
	};
};

export default connect(mapStateToProps)(GroupQuestions);
