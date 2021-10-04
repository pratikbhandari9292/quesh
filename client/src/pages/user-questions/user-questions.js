import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { getUserQuestions } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";

import {
	setUserQuestions,
	setNeedToFetchUQ,
	setQuestionsMessage,
} from "../../redux/user-questions/user-questions.actions";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import PageHeader from "../../components/page-header/page-header";
import CardsList from "../../components/cards-list/cards-list";
import Button from "../../components/button/button";

const UserQuestions = ({ questions, questionsMessage, needToFetch }) => {
	const [fetchingQuestions, setFetchingQuestions] = useState(false);

	const dispatch = useDispatch();

	const location = useLocation();
	const history = useHistory();

	const { _id: userID, token } = getCurrentUser();

	useEffect(() => {
		if (needToFetch) {
			fetchUserQuestions();
		}
	}, [needToFetch]);

	const fetchUserQuestions = async () => {
		setFetchingQuestions(true);

		try {
			const result = await getUserQuestions(userID, token);

			if (result.error) {
				return dispatch(setQuestionsMessage("something went wrong"));
			}

			if (result.questions.length === 0) {
				return dispatch(setQuestionsMessage("you have no questions"));
			}

			dispatch(setUserQuestions(result.questions));
			dispatch(setNeedToFetchUQ(false));
		} catch (error) {
		} finally {
			setFetchingQuestions(false);
		}
	};

	return (
		<div>
			<PageHeader title="your questions" capFirst info={questions.length}>
				<Button
					size="smallest"
					color="blue"
					type="secondary"
					clickHandler={() => history.push("/questions/me/search")}
				>
					<SearchIcon /> search
				</Button>
			</PageHeader>

			{!location.pathname.includes("search") && (
				<CardsList
					list={questions}
					loadingList={fetchingQuestions}
					type="question"
					listMessage={questionsMessage}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		questions: state.userQuestions.questions,
		questionsMessage: state.userQuestions.questionsMessage,
		needToFetch: state.userQuestions.needToFetch,
	};
};

export default connect(mapStateToProps)(UserQuestions);
