import React from "react";

import styles from "./cards-list.module.scss";

import GroupCard from "../group-card/group-card";
import StatusMessage from "../status-message/status-message";
import CardsSkeleton from "../cards-skeleton/cards-skeleton";
import QuestionCard from "../question-card/question-card";
import UserCard from "../user-card/user-card";
import NotificationCard from "../notification-card/notification-card";

const CardsList = ({
	list,
	listMessage,
	loadingList,
	type = "group",
	userCardType,
	messageAlign,
	selfContent,
}) => {
	if (loadingList) {
		return <CardsSkeleton type={type} />;
	}

	if (listMessage) {
		return (
			<div className={styles.listMainSecondary}>
				<StatusMessage
					message={listMessage}
					spinner={loadingList}
					align={messageAlign}
				/>
			</div>
		);
	}

	const getClassName = () => {
		if (list.length === 0) {
			return styles.listMainSecondary;
		}

		switch (type) {
			case "group":
				return styles.groupsList;
			case "question":
				return styles.questionsList;
			case "user":
				return styles.usersList;
			default:
				return null;
		}
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
							selfContent={selfContent}
							key={listItem._id}
						/>
					);
				case "user":
					return (
						<UserCard
							{...listItem}
							userID={listItem._id || listItem.userID}
							key={listItem._id || listItem.userID}
							type={userCardType}
						/>
					);
				case "notification":
					return <NotificationCard { ...listItem } key = { listItem._id } />
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
