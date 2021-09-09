import React from "react";

import styles from "./cards-list.module.scss";

import GroupCard from "../group-card/group-card";
import StatusMessage from "../status-message/status-message";
import CardsSkeleton from "../cards-skeleton/cards-skeleton";
import QuestionCard from "../question-card/question-card";
import UserCard from "../user-card/user-card";

const CardsList = ({
	list,
	listMessage,
	loadingList,
	type = "group",
	userCardType,
}) => {
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

	const renderCards = () => {
		return list.map((listItem) => {
			switch (type) {
				case "group":
					return (
						<GroupCard
							{...listItem}
							groupID={listItem._id}
							key={listItem._id}
						/>
					);
				case "question":
					return (
						<QuestionCard
							{...listItem}
							questionID={listItem._id}
							key={listItem._id}
						/>
					);
				case "user":
					return (
						<UserCard
							{...listItem}
							userID={listItem._id}
							key={listItem._id}
							type={userCardType}
						/>
					);
				default:
					return null;
			}
		});
	};

	return (
		<div className={styles.container}>
			<div className={getClassName()}>{renderCards()}</div>
		</div>
	);
};

export default CardsList;
