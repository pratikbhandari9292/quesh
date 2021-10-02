import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import formStyles from "../../styles/form.module.scss";

import { resetModal, setModal } from "../../redux/modal/modal.actions";
import { displayAlert } from "../../redux/alert/alert.actions";
import { updateActiveQuestion } from "../../redux/group-questions/group-questions.actions";

import { solveOrPropose } from "../../api/api.solution";
import { getCurrentUser } from "../../local-storage/current-user";
import { setFilesErrorExternal } from "../../utils/utils.files";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import FileSelector from "../../components/file-selector/file-selector";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";

const SolveQuestion = ({ type, activeQuestion, selectedFiles }) => {
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [filesError, setFilesError] = useState("");

	const dispatch = useDispatch();

	const history = useHistory();
	const { groupID, questionID } = useParams();

	const formHeading =
		type === "solve" ? "solve question" : "propose solution";

	const currentUser = getCurrentUser();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		dispatch(
			setModal(
				true,
				type === "solve"
					? "solving question..."
					: "proposing solution...",
				<Spinner />,
				false
			)
		);

		try {
			const result = await solveOrPropose(
				{ description, images: selectedFiles },
				questionID,
				type,
				currentUser.token
			);

			if (result.error) {
				setFieldErrors(result.error);
			}

			const message =
				type === "solve" ? "question solved" : "solution proposed";
			const solution = { ...result.solution, author: result.author };
			const updateInfo =
				type === "solve"
					? { solution }
					: {
							proposedSolutions: [
								...activeQuestion.proposedSolutions,
								solution,
							],
					  };

			dispatch(updateActiveQuestion(updateInfo));
			dispatch(displayAlert(message));
			history.push(`/group/${groupID}/question/${questionID}`);
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	const setFieldErrors = (error) => {
		if (error.includes("description")) {
			return setDescriptionError(error);
		}

		setFilesErrorExternal(error, setFilesError);
	};

	return (
		<div className={formStyles.container}>
			<FormHeader heading={formHeading} />

			<form className={formStyles.form} onSubmit={handleFormSubmit}>
				<InputGroup
					label="description"
					displayType="textarea"
					placeholder="maximum 250 characters"
					value={description}
					error={descriptionError}
					changeHandler={setDescription}
				/>

				<FileSelector
					label="select upto 5 images, max 5mb each"
					text="select images"
					error={filesError}
				/>

				<Button size="full">{formHeading}</Button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.groupQuestions.activeQuestion,
		selectedFiles: state.files.selectedFiles,
	};
};

export default connect(mapStateToProps)(SolveQuestion);
