import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import styles from "./post-question.module.scss";

import {
	addGroupQuestion,
	setEditingQuestion,
	updateActiveQuestion,
} from "../../redux/group-questions/group-questions.actions";
import { displayAlert } from "../../redux/alert/alert.actions";
import { resetModal, setModal } from "../../redux/modal/modal.actions";
import { addUserQuestion } from "../../redux/user-questions/user-questions.actions";

import { askQuestion, updateQuestion } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";
import { setFilesErrorExternal } from "../../utils/utils.files";
import { renderPostImages } from "../../utils/utils.posts";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import Button from "../../components/button/button";
import FileSelector from "../../components/file-selector/file-selector";
import Spinner from "../../components/spinner/spinner";

const PostQuestion = ({ selectedFiles, editingQuestion, activeQuestion }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [filesError, setFilesError] = useState("");
	const [postType, setPostType] = useState("ask");
	const [activeImages, setActiveImages] = useState([]);

	const params = useParams();
	const history = useHistory();
	const location = useLocation();

	const dispatch = useDispatch();

	const groupID = params.id;
	const questionID = params.questionID;

	const currentUser = getCurrentUser();

	useEffect(() => {
		if (location.pathname.includes("edit")) {
			setPostType("edit");
		}
	}, [location]);

	useEffect(() => {
		if (editingQuestion && activeQuestion) {
			const { title, description, images } = activeQuestion;

			setTitle(title);
			setDescription(description);
			setActiveImages(images.length > 0 ? images : []);
		}
	}, [editingQuestion, activeQuestion]);

	useEffect(() => {
		return () => {
			dispatch(setEditingQuestion(false));
		};
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		clearFieldErrors();
		dispatch(
			setModal(true, `${postType}ing question...`, <Spinner />, false)
		);

		try {
			let result = {};
			const questionInfo = {
				title: title.trim(),
				description: description.trim(),
			};

			if (postType === "ask") {
				result = await askQuestion(
					{ ...questionInfo, images: selectedFiles },
					groupID,
					currentUser.token
				);
			} else {
				result = await updateQuestion(
					questionID,
					questionInfo,
					currentUser.token
				);
			}

			if (result.error) {
				return setFieldErrors(result.error);
			}

			if (postType === "ask") {
				const question = {
					...result.question,
					author: result.author,
					group: result.group,
				};

				dispatch(addGroupQuestion(question));
				dispatch(addUserQuestion(question));
			} else {
				const { title, description } = result.question;

				dispatch(updateActiveQuestion({ title, description }));
			}

			history.goBack();
			dispatch(displayAlert(`question ${postType}ed`));
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

	const clearFieldErrors = () => {
		setDescriptionError("");
		setFilesError("");
	};

	const renderQuestionImages = () => {
		return renderPostImages(
			activeImages,
			"question images",
			"question",
			questionID
		);
	};

	return (
		<div>
			<div className={styles.formContainer}>
				<FormHeader heading={`${postType} question`} />
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<InputGroup
						label="title"
						placeholder="optional"
						value={title}
						changeHandler={setTitle}
					/>

					<InputGroup
						label="description"
						placeholder="decribe the problem in maximum 150 characters"
						value={description}
						displayType="textarea"
						error={descriptionError}
						changeHandler={setDescription}
					/>

					{postType === "edit" && renderQuestionImages()}

					{postType === "ask" && (
						<FileSelector
							text="select images"
							maxFiles={3 - selectedFiles.length}
							error={filesError}
						/>
					)}

					<Button size="full">{postType} question</Button>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedFiles: state.files.selectedFiles,
		editingQuestion: state.groupQuestions.editingQuestion,
		activeQuestion: state.groupQuestions.activeQuestion,
	};
};

export default connect(mapStateToProps)(PostQuestion);
