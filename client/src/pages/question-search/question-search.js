import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./question-search.module.scss";

import { setSearchedQuestions } from "../../redux/group-questions/group-questions.actions";

import { searchQuestion } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";

import GenericSearch from "../../components/generic-search/generic-search";
import CardsList from "../../components/cards-list/cards-list";

const QuestionSearch = ({ searchedQuestions }) => {
	const [searchMessage, setSearchMessage] = useState(false);
	const [searching, setSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const params = useParams();

	const dispatch = useDispatch();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	useEffect(() => {
		return () => {
			dispatch(setSearchedQuestions([]));
		};
	}, []);

	const handleFormSubmit = async () => {
		setSearching(true);
		setSearchMessage("");

		try {
			const result = await searchQuestion(
				searchTerm,
				groupID,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			if (result.questions.length > 0) {
				return dispatch(setSearchedQuestions(result.questions));
			}

			setSearchMessage("no questions found");
		} catch (error) {
		} finally {
			setSearching(false);
		}
	};

	return (
		<div>
			<GenericSearch
				placeholder="title or description..."
				value={searchTerm}
				changeHandler={setSearchTerm}
				submitHandler={handleFormSubmit}
			/>

			<div className={styles.divider}></div>

			<CardsList
				list={searchedQuestions}
				listMessage={
					searchMessage ||
					(searchedQuestions.length === 0 &&
						"questions will appear here")
				}
				loadingList={searching}
				type="question"
				messageAlign="left"
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		searchedQuestions: state.groupQuestions.searchedQuestions,
	};
};

export default connect(mapStateToProps)(QuestionSearch);
