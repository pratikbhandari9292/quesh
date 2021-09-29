import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./group-card.module.scss";

import { setActiveGroup } from "../../redux/groups/groups.actions";

import { getCurrentUser } from "../../local-storage/current-user";
import { getHowLongAgo } from "../../utils/utils.date-time";

const GroupCard = (props) => {
	const {
		groupID,
		title,
		owner,
		memberJoinRequests,
		createdAt,
		noOfMembers,
	} = props;

	const history = useHistory();

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	const handleGroupClick = () => {
		if (currentUser.groups.find((group) => group._id === groupID)) {
			dispatch(setActiveGroup({ ...props }));
			return history.push(`/group/${groupID}/explore`);
		}

		return history.push(`/group/${groupID}/details`);
	};

	return (
		<div className={styles.container} onClick={handleGroupClick}>
			<h3 className={styles.title}>{title}</h3>

			<div className={styles.infoContainer}>
				<span className={styles.infoTitle}>owner</span>
				<span className={styles.info}>
					{owner._id === currentUser._id ? "me" : owner.username}
				</span>
			</div>

			<div className={styles.infoContainer}>
				<span className={styles.infoTitle}>join requests</span>
				<span className={styles.info}>{memberJoinRequests.length}</span>
			</div>

			<div className={styles.infoContainer}>
				<span className={styles.infoTitle}>members</span>
				<span className={styles.info}>{noOfMembers}</span>
			</div>

			<div className={styles.infoContainer}>
				<span className={styles.infoTitle}>created</span>
				<span className={styles.info}>
					{getHowLongAgo(createdAt)} ago
				</span>
			</div>
		</div>
	);
};

export default GroupCard;
