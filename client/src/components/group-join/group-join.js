import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./group-join.module.scss";

import { setModal, setClosable } from "../../redux/modal/modal.actions";
import { addGroup } from "../../redux/groups/groups.actions";
import { displayAlert } from "../../redux/alert/alert.actions";

import { joinGroup } from "../../api/api.group";
import { getCurrentUser, addUserGroup } from "../../local-storage/current-user";

import InputGroup from "../input-group/input-group";
import Button from "../button/button";
import FormHeader from "../form-header/form-header";

const GroupJoin = () => {
	const [joinID, setJoinID] = useState("");
	const [error, setError] = useState("");
	const [joining, setJoining] = useState(false);

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		setError("");

		if (!joinID) {
			return setError("join id cannot be empty");
		}

		setJoining(true);
		//cannot close modal hereafter until processing is done
		dispatch(setClosable(false));

		try {
			const result = await joinGroup(joinID, currentUser.token);

			if (result.error) {
				return setError(result.error);
			}

			addUserGroup(result.group);
			dispatch(setModal(false, ""));
			dispatch(addGroup(result.group));
			dispatch(displayAlert("you have joined the group"));
		} catch (error) {
			console.log(error);
			setError("something went wrong");
		} finally {
			//can close modal in case of errors, if joined successfully, modal will automatically close
			dispatch(setClosable(true));
			setJoining(false);
		}
	};

	return (
		<div className={styles.container}>
			<FormHeader
				heading="join a group"
				subheading="enter the join id of the group you want to join"
			/>
			<form onSubmit={handleFormSubmit}>
				<InputGroup
					placeholder="enter join id"
					changeHandler={setJoinID}
					value={joinID}
					error={error}
				/>
				<Button color="blue" loading={joining}>
					{joining ? "joining group" : "join group"}
				</Button>
			</form>
		</div>
	);
};

export default GroupJoin;
