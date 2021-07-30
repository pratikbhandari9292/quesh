import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./groups-list.module.scss";

import { setGroups } from "../../redux/groups/groups.actions";

import { getCurrentUser } from "../../local-storage/current-user";
import { getUserGroups } from "../../api/api.user";

import Group from "../group/group";
import LoadingMessage from "../loading-message/loading-message";
import PageHeader from "../../components/page-header/page-header";
import Button from "../button/button";

const GroupsList = ({ groups }) => {
	const [loadingGroups, setLoadingGroups] = useState(false);
	const [groupsMessage, setGroupsMessage] = useState("");
	const [groupsError, setGroupsError] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchUserGroups();
	}, []);

	const fetchUserGroups = async () => {
		setLoadingGroups(true);
		setGroupsMessage("loading your groups...");

		const currentUser = getCurrentUser();

		try {
			const result = await getUserGroups(
				currentUser._id,
				currentUser.token
			);

			setLoadingGroups(false);

			if (result.groups) {
				return result.groups.length > 0
					? dispatch(setGroups(result.groups))
					: setGroupsMessage("you are not a member of any group");
			}
		} catch (error) {
			setGroupsError(true);
			setLoadingGroups(false);
			setGroupsMessage("unable to get groups");
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<PageHeader title="your groups" info={groups.length}>
				<Button type="secondary" size="smaller">
					create group
				</Button>
			</PageHeader>

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
					<LoadingMessage
						message={groupsMessage}
						spinner={loadingGroups}
					/>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
	};
};

export default connect(mapStateToProps)(GroupsList);
