import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./group-join.module.scss";

import { setModalInfo } from "../../redux/modal/modal.actions";
import { addGroup } from "../../redux/groups/groups.actions";

import { joinGroup } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import InputGroup from "../input-group/input-group";
import Button from "../button/button";
import FormHeader from "../form-header/form-header";
import Spinner from "../spinner/spinner";

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

		try {
			const result = await joinGroup(joinID, currentUser.token);

			setJoining(false);

			if (result.error) {
				return setError(result.error);
			}

			dispatch(setModalInfo(false, ""));
			dispatch(addGroup(result.group));
		} catch (error) {
			console.log(error);
			setJoining(false);
			setError("something went wrong");
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
				<Button color="blue">
					{joining ? (
						<React.Fragment>
							joining group <Spinner color="white" />
						</React.Fragment>
					) : (
						"join group"
					)}
				</Button>
			</form>
		</div>
	);
};

export default GroupJoin;
