import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { displayAlert } from "../../../redux/alert/alert.actions";
import { updateGroup } from "../../../redux/groups/groups.actions";

import { getCurrentUser } from "../../../local-storage/current-user";
import { acceptOrRejectJoinRequest } from "../../../api/api.group";

import Button from "../../button/button";

const RequestControls = ({ userID }) => {
	const [accepting, setAccepting] = useState(false);
	const [rejecting, setRejecting] = useState(false);

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

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
};

export default RequestControls;
