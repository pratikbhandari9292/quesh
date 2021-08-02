import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./groups-list.module.scss";

import { setGroups } from "../../redux/groups/groups.actions";

import { getCurrentUser } from "../../local-storage/current-user";
import { getUserGroups } from "../../api/api.user";

import Group from "../group/group";
import StatusMessage from "../../components/status-message/status-message";
import PageHeader from "../../components/page-header/page-header";
import Button from "../button/button";

const GroupsList = ({ groups }) => {
	const [loadingGroups, setLoadingGroups] = useState(false);
	const [groupsMessage, setGroupsMessage] = useState("");
	const [groupsError, setGroupsError] = useState(false);

	const dispatch = useDispatch();

	const history = useHistory();

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

			if (result.groups) {
				return result.groups.length > 0
					? dispatch(setGroups(result.groups))
					: setGroupsMessage("you are not a member of any group");
			}
		} catch (error) {
			setGroupsError(true);
			setGroupsMessage(
				"something went wrong, maybe some network problem."
			);
			console.log(error);
		} finally {
			setLoadingGroups(false);
		}
	};

	return (
		<div className={styles.container}>
			<PageHeader title="your groups" info={groups.length}>
				<Button
					type="secondary"
					size="smaller"
					clickHandler={() => history.push("/group/create")}
				>
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
					<StatusMessage
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
