import React, { useState, useEffect } from "react";

import styles from "./groups-list.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";
import { getUserGroups } from "../../api/api.user";

import Group from "../group/group";

const GroupsList = () => {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		fetchUserGroups();
	}, []);

	const fetchUserGroups = async () => {
		const currentUser = getCurrentUser();

		try {
			const result = await getUserGroups(
				currentUser._id,
				currentUser.token
			);

			if (result.groups) {
				return setGroups(result.groups);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<p className={styles.title}>your groups</p>
			<div className={styles.listMain}>
				{groups.length > 0
					? groups.map((group) => {
							return <Group {...group} />;
					  })
					: null}
			</div>
		</div>
	);
};

export default GroupsList;
