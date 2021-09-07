import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./group.module.scss";

import { setMemNum } from "../../redux/groups/groups.actions";

import { getMemNum } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";
import { getHowLongAgo } from "../../utils/utils.date-time";

import DotIndicator from "../dot-indicator/dot-indicator";

const Group = ({
	id,
	title,
	owner,
	memberJoinRequests,
	createdAt,
	groupsMemNum,
	noOfMembers,
}) => {
	const history = useHistory();

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	useEffect(() => {
		if (getMemNumber()) {
			return;
		}

		// fetchMemNum();
	}, []);

	// const fetchMemNum = async () => {
	// 	try {
	// 		const result = await getMemNum(id, currentUser.token);

	// 		dispatch(setMemNum(id, result.memNum));
	// 	} catch (error) {
	// 		console.log(error);
	// 		dispatch(setMemNum(id, "none"));
	// 	}
	// };

	const getMemNumber = () => {
		const item = groupsMemNum.find((group) => group.id === id);

		if (item) {
			return item.memNum;
		}

		return null;
	};

	const handleGroupClick = () => {
		if (currentUser.groups.find((group) => group._id === id)) {
			return history.push(`/group/explore/${id}`);
		}

		return history.push(`/group/details/${id}`);
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
				<span className={styles.info}>
					{/* {getMemNumber() !== null ? (
						getMemNumber()
					) : (
						<DotIndicator />
					)} */}
					{noOfMembers}
				</span>
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

const mapStateToProps = (state) => {
	return {
		groupsMemNum: state.groups.groupsMemNum,
	};
};

export default connect(mapStateToProps)(Group);
