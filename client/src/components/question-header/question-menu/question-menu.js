import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
	displayConfirmationModal,
	resetModal,
	setClosable,
	setModal,
} from "../../../redux/modal/modal.actions";
import {
	displayAlert,
	displayErrorAlert,
} from "../../../redux/alert/alert.actions";
import { removeGroupQuestion } from "../../../redux/group-questions/group-questions.actions";

import { deleteQuestion } from "../../../api/api.question";

import DotMenu from "../../dot-menu/dot-menu";
import DropdownItem from "../../dropdown-item/dropdown-item";
import Spinner from "../../spinner/spinner";

const QuestionMenu = ({ questionID, authorID, currentUserID, token }) => {
	const dispatch = useDispatch();

	const history = useHistory();

	const handleDeleteClick = () => {
		dispatch(
			displayConfirmationModal(
				"are you sure you want to delete this question ?",
				handleQuestionDeletion
			)
		);
	};

	const handleQuestionDeletion = async () => {
		dispatch(setClosable(false));
		dispatch(setModal(true, "deleting question...", <Spinner />, false));

		try {
			const result = await deleteQuestion(questionID, token);

			if (result.error) {
				return dispatch(displayErrorAlert());
			}

			history.goBack();
			dispatch(removeGroupQuestion(questionID));
			dispatch(displayAlert("question deleted"));
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	if (authorID !== currentUserID) {
		return null;
	}

	return (
		<DotMenu indicator="right">
			<DropdownItem>edit question</DropdownItem>
			<DropdownItem type="danger" clickHandler={handleDeleteClick}>
				delete question
			</DropdownItem>
		</DotMenu>
	);
};

export default QuestionMenu;
