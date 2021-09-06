import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./create-group.module.scss";

import { setModal, setClosable } from "../../redux/modal/modal.actions";
import { addGroup } from "../../redux/groups/groups.actions";
import { displayAlert } from "../../redux/alert/alert.actions";

import { createGroup } from "../../api/api.group";
import { getCurrentUser, addUserGroup } from "../../local-storage/current-user";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";

const CreateGroup = () => {
	const [title, setTitle] = useState("");
	const [about, setAbout] = useState("");
	const [description, setDescription] = useState("");
	const [titleError, setTitleError] = useState("");
	const [descriptionError, setDescriptionError] = useState("");

	const dispatch = useDispatch();

	const history = useHistory();

	const currentUser = getCurrentUser();

	useEffect(() => {
		document.title = "Create a new group";
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		clearFieldErrors();

		dispatch(setModal(true, "creating group...", <Spinner />, false));

		try {
			const result = await createGroup(currentUser.token, {
				title: title.trim(),
				about: about.trim(),
				description: description.trim(),
			});

			if (result.error) {
				console.log(result.error);
				return setFieldErrors(result.error);
			}

			addUserGroup(result.group);
			dispatch(addGroup(result.group));
			dispatch(displayAlert("group has been created"));
			history.push("/groups/me");
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setModal(false, ""));
			dispatch(setClosable(true));
		}
	};

	const setFieldErrors = (error) => {
		if (error.includes("empty")) {
			if (error.includes("title")) {
				return setTitleError(error);
			}

			return setDescriptionError(error);
		}

		if (error.includes("more")) {
			return setTitleError(error);
		}

		if (error.includes("atleast")) {
			return setDescriptionError(error);
		}
	};

	const clearFieldErrors = () => {
		setTitleError("");
		setDescriptionError("");
	};

	return (
		<div className={styles.container}>
			<FormHeader heading="create a new group" />
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<InputGroup
					label="title"
					placeholder="maximum 50 characters"
					value={title}
					error={titleError}
					changeHandler={setTitle}
				/>
				<InputGroup
					label="about"
					labelInfo="separate with commas"
					placeholder="optional, helps in group search"
					value={about}
					changeHandler={setAbout}
				/>
				<InputGroup
					label="description"
					placeholder="minimum 25 characters"
					value={description}
					error={descriptionError}
					displayType="textarea"
					changeHandler={setDescription}
				/>

				<Button size="full">create</Button>
			</form>
		</div>
	);
};

export default CreateGroup;
