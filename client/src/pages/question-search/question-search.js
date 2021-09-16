import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./question-search.module.scss";

import { searchQuestion } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";

import GenericSearch from "../../components/generic-search/generic-search";
import CardsList from "../../components/cards-list/cards-list";

const QuestionSearch = () => {
	const [searchedQuestions, setSearchedQuestions] = useState([]);
	const [searchMessage, setSearchMessage] = useState(false);
	const [searching, setSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

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
				return setSearchedQuestions(result.questions);
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

export default QuestionSearch;
