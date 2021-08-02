import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./membership-status.module.scss";

import { displayAlert } from "../../redux/alert/alert.actions";

import { requestGroupJoin, joinGroup } from "../../api/api.group";

import { ReactComponent as TickIcon } from "../../assets/icons/tick.svg";

import Button from "../../components/button/button";
import InputGroup from "../../components/input-group/input-group";
import Spinner from "../../components/spinner/spinner";

const MembershipStatus = ({ member, groupID, token }) => {
	const [joinID, setJoinID] = useState("");
	const [error, setError] = useState("");
	const [requesting, setRequesting] = useState(false);
	const [joining, setJoining] = useState(false);
	const [requested, setRequested] = useState(false);

	const dispatch = useDispatch();

	const handleRequestButtonClick = async (event) => {
		event.preventDefault();

		if (joining || requested) {
			return;
		}

		setRequesting(true);

		try {
			const result = await requestGroupJoin(groupID, token);

			if (result.message === "request sent") {
				setRequested(true);
				dispatch(displayAlert("request has been sent"));
			}

			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setRequesting(false);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		setError("");

		if (requesting) {
			return;
		}

		if (!joinID) {
			return setError("join id cannot be empty");
		}

		setJoining(true);

		try {
			const result = await joinGroup(joinID, token);

			if (result.error) {
				return setError(result.error);
			}

			dispatch(displayAlert("you have joined the group"));
		} catch (error) {
			console.log(error);
		} finally {
			setJoining(false);
		}
	};

	return (
		<div className={styles.container}>
			<p className={styles.title}>you are not a member of this group</p>

			<div>
				{requested ? (
					<p className={styles.subtitle}>
						you have sent a join request. Join directly if you have
						the join id
					</p>
				) : (
					<p className={styles.subtitle}>
						if you have the join id, you can directly join,
						otherwise you can send a join request
					</p>
				)}

				<form onSubmit={handleFormSubmit}>
					<InputGroup
						placeholder="enter join id"
						value={joinID}
						error={error}
						changeHandler={setJoinID}
					/>
					<div className={styles.buttons}>
						<Button
							size="smaller"
							type="secondary"
							clickHandler={handleRequestButtonClick}
						>
							{requesting ? (
								<React.Fragment>
									requesting <Spinner />
								</React.Fragment>
							) : requested ? (
								<React.Fragment>
									request sent <TickIcon />
								</React.Fragment>
							) : (
								"request join"
							)}
						</Button>
						<Button color="blue" size="smaller">
							{joining ? (
								<React.Fragment>
									joining <Spinner />
								</React.Fragment>
							) : (
								"join group"
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MembershipStatus;
