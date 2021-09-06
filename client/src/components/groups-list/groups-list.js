import React from "react";

import styles from "./groups-list.module.scss";

import Group from "../group/group";
import StatusMessage from "../../components/status-message/status-message";
import CardsSkeleton from "../../components/cards-skeleton/cards-skeleton";

const GroupsList = ({ groups, groupsMessage, loadingGroups }) => {
	if (loadingGroups) {
		return <CardsSkeleton />;
	}

	if (groupsMessage) {
		return (
			<div className={styles.listMainSecondary}>
				<StatusMessage
					message={groupsMessage}
					spinner={loadingGroups}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div
				className={`${
					groups.length > 0
						? styles.listMain
						: styles.listMainSecondary
				}`}
			>
				{groups.map((group) => {
					return <Group {...group} id={group._id} key={group._id} />;
				})}
			</div>
		</div>
	);
};

export default GroupsList;
