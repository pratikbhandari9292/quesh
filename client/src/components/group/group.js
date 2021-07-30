import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import styles from "./group.module.scss";

import { setMemQues } from "../../redux/groups/groups.actions";

import { getMemQuesNumber } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import DotIndicator from "../dot-indicator/dot-indicator";

const Group = ({ id, title, owner, memberJoinRequests, groupsMemQues }) => {
	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	useEffect(() => {
		fetchMemQuesNumber();
	}, []);

	const fetchMemQuesNumber = async () => {
		try {
			const result = await getMemQuesNumber(id, currentUser.token);

			dispatch(setMemQues(id, result.memNumber, result.quesNumber));
		} catch (error) {
			console.log(error);
			dispatch(setMemQues(id, "none", "none"));
		}
	};

	const getMemQues = (type) => {
		const item = groupsMemQues.find((group) => group.id === id);

		if (type === "member") {
			if (item) {
				return item.membersNumber;
			}

			return null;
		}

		if (type === "question") {
			if (item) {
				return item.unsolvedQuestionsNumber;
			}

			return null;
		}
	};

	return (
		<div className={styles.container}>
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
					{getMemQues("member") !== null ? (
						getMemQues("member")
					) : (
						<DotIndicator />
					)}
				</span>
			</div>

			<div className={styles.infoContainer}>
				<span className={styles.infoTitle}>unsolved questions</span>
				<span className={styles.info}>
					{getMemQues("question") !== null ? (
						getMemQues("question")
					) : (
						<DotIndicator />
					)}
				</span>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groupsMemQues: state.groups.groupsMemQues,
	};
};

export default connect(mapStateToProps)(Group);
