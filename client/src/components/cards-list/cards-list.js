import React from "react";

import styles from "./cards-list.module.scss";

import Group from "../group/group";
import StatusMessage from "../status-message/status-message";
import CardsSkeleton from "../cards-skeleton/cards-skeleton";
import QuestionCard from "../question-card/question-card";

const CardsList = ({ list, listMessage, loadingList, type = "group" }) => {
	if (loadingList) {
		return <CardsSkeleton type={type} />;
	}

	if (listMessage) {
		return (
			<div className={styles.listMainSecondary}>
				<StatusMessage message={listMessage} spinner={loadingList} />
			</div>
		);
	}

	const getClassName = () => {
		if (list.length === 0) {
			return styles.listMainSecondary;
		}

		return type === "group" ? styles.groupsList : styles.questionsList;
	};

	return (
		<div className={styles.container}>
			<div className={getClassName()}>
				{list.map((listItem) => {
					return type === "group" ? (
						<Group
							{...listItem}
							id={listItem._id}
							key={listItem._id}
						/>
					) : (
						<QuestionCard
							{...listItem}
							questionID={listItem._id}
							key={listItem._id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CardsList;
