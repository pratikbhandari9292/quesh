import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import userCardStyles from "../user-card.module.scss";

import {
	displayConfirmationModal,
	resetModal,
	setModal,
} from "../../../redux/modal/modal.actions";
import { updateGroup } from "../../../redux/groups/groups.actions";
import { displayAlert } from "../../../redux/alert/alert.actions";

import { delegateOwnership } from "../../../api/api.group";
import { getCurrentUser } from "../../../local-storage/current-user";
import { sendNotification } from "../../../api/api.notification";

import Button from "../../button/button";
import Spinner from "../../spinner/spinner";

const OwnershipControl = ({ userID, username, currentGroup }) => {
	const dispatch = useDispatch();
	const currentUser = getCurrentUser();
	const history = useHistory();
	const { id: groupID } = useParams();

	const handleMakeOwnerClick = () => {
		dispatch(
			displayConfirmationModal(
				`are you sure you want to delegate ownership to ${username} ?`,
				handleOwnershipDelegation
			)
		);
	};

	const handleOwnershipDelegation = async () => {
		dispatch(setModal(true, "delegating ownership...", <Spinner />, false));

		try {
			const result = await delegateOwnership(
				currentGroup._id,
				userID,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			dispatch(updateGroup(currentGroup._id, { owner: result.owner }));
			dispatch(displayAlert("ownership delegated"));

			//send a notification to the delegated owner
			const notificationInfo = {
				type: "user",
				notifAction: "delegate ownership",
				userDests: [userID],
				groupDest: groupID
			}
			sendNotification(notificationInfo, currentUser.token)

			history.push("/groups/me");
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	if (userID === currentGroup.owner._id) {
		return null;
	}

	return (
		<div className={userCardStyles.controls}>
			<Button
				color="blue"
				size="smaller"
				clickHandler={handleMakeOwnerClick}
			>
				delegate
			</Button>
		</div>
	);
};

export default OwnershipControl;
