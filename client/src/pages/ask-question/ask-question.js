import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./ask-question.module.scss";

import { askQuestion } from "../../api/api.question";
import { getCurrentUser } from "../../local-storage/current-user";

import GroupHeader from "../../components/group-header/group-header";
import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import Button from "../../components/button/button";

const AskQuestion = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [about, setAbout] = useState("");

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const result = await askQuestion(
				{
					title: title.trim(),
					description: description.trim(),
					about: about.trim(),
				},
				groupID,
				currentUser.token
			);
			console.log(result);
		} catch (error) {}
	};

	return (
		<div>
			<GroupHeader />

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
						placeholder="describe the question"
						displayType="textarea"
						changeHandler={setDescription}
					/>
					<InputGroup
						label="about"
						placeholder="optional"
						changeHandler={setAbout}
					/>
					<Button size="full">ask question</Button>
				</form>
			</div>
		</div>
	);
};

export default AskQuestion;
