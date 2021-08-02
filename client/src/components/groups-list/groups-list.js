import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./groups-list.module.scss";

import Group from "../group/group";
import StatusMessage from "../../components/status-message/status-message";

const GroupsList = ({ groups, groupsMessage, loadingGroups }) => {
	return (
		<div className={styles.container}>
			<div
				className={`${
					groups.length > 0
						? styles.listMain
						: styles.listMainSecondary
				}`}
			>
				{groups.length > 0 ? (
					groups.map((group) => {
						return (
							<Group {...group} id={group._id} key={group._id} />
						);
					})
				) : (
					<StatusMessage
						message={groupsMessage}
						spinner={loadingGroups}
					/>
				)}
			</div>
		</div>
	);
};

export default GroupsList;
