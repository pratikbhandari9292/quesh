import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./user-card.module.scss";

import { displayAlert } from "../../redux/alert/alert.actions";
import { updateGroup } from "../../redux/groups/groups.actions";

import { acceptOrRejectJoinRequest } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import ProfilePicture from "../profile-picture/profile-picture";
import Button from "../button/button";

const UserCard = ({ userID, username, email, type }) => {
	const [accepting, setAccepting] = useState(false);
	const [rejecting, setRejecting] = useState(false);

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

	const renderUserControls = () => {
		switch (type) {
			case "join-request":
				return (
					<React.Fragment>
						<Button
							color="blue"
							size="smaller"
							loading={accepting}
							clickHandler={() => {
								handleAcceptOrRejectClick("accept");
							}}
						>
							{accepting ? "accepting" : "accept"}
						</Button>
						<Button
							size="smaller"
							loading={rejecting}
							clickHandler={() => {
								handleAcceptOrRejectClick("reject");
							}}
						>
							{rejecting ? "rejecting" : "reject"}
						</Button>
					</React.Fragment>
				);
			default:
				return null;
		}
	};

	const handleAcceptOrRejectClick = async (action) => {
		if (accepting || rejecting) {
			return;
		}

		if (action === "accept") {
			setAccepting(true);
		} else {
			setRejecting(true);
		}

		try {
			const result = await acceptOrRejectJoinRequest(
				groupID,
				action,
				userID,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			dispatch(updateGroup(groupID, result.group));
			dispatch(displayAlert(`request ${action}ed`));
		} catch (error) {
		} finally {
			setAccepting(false);
			setRejecting(false);
		}
	};

	return (
		<div className={styles.userCard}>
			<div className={styles.user}>
				<ProfilePicture username={username} />
				<div className={styles.userInfo}>
					<p className={styles.username}>{username}</p>
					<p className={styles.email}>{email}</p>
				</div>
			</div>
			<div className={styles.controls}>{renderUserControls()}</div>
		</div>
	);
};

export default UserCard;
