import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import styles from "./ask-question.module.scss";

import { addGroupQuestion } from "../../redux/group-questions/group-questions.actions";
import { displayAlert } from "../../redux/alert/alert.actions";

import { askQuestion } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import Button from "../../components/button/button";
import FileSelector from "../../components/file-selector/file-selector";

const AskQuestion = ({ selectedFiles }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("pratiic");
	const [descriptionError, setDescriptionError] = useState("");
	const [filesError, setFilesError] = useState("");
	const [asking, setAsking] = useState(false);

	const params = useParams();
	const history = useHistory();

	const dispatch = useDispatch();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (asking) {
			return;
		}

		clearFieldErrors();
		setAsking(true);

		try {
			const result = await askQuestion(
				{
					title: title.trim(),
					description: description.trim(),
					images: selectedFiles,
				},
				groupID,
				currentUser.token
			);

			if (result.error) {
				return setFieldErrors(result.error);
			}

			history.goBack();
			dispatch(displayAlert("question asked"));
			dispatch(addGroupQuestion(result.question));
		} catch (error) {
		} finally {
			setAsking(false);
		}
	};

	const setFieldErrors = (error) => {
		if (error.includes("description")) {
			return setDescriptionError(error);
		}

		if (
			error.includes("supported") ||
			error.includes("MB") ||
			error.includes("uploaded")
		) {
			setFilesError(error);
		}
	};

	const clearFieldErrors = () => {
		setDescriptionError("");
		setFilesError("");
	};

	return (
		<div>
			<div className={styles.formContainer}>
				<FormHeader heading="ask a question" />
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<InputGroup
						label="title"
						placeholder="optional"
						changeHandler={setTitle}
					/>
					<InputGroup
						label="description"
						placeholder="decribe the problem in maximum 150 characters"
						displayType="textarea"
						changeHandler={setDescription}
						error={descriptionError}
					/>
					<FileSelector
						label="select upto 3 images, max 5mb each"
						text="select images"
						error={filesError}
					/>
					<Button size="full" loading={asking}>
						{asking ? "asking question" : "ask question"}
					</Button>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedFiles: state.files.selectedFiles,
	};
};

export default connect(mapStateToProps)(AskQuestion);
