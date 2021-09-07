import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./groups.module.scss";

import { setModal } from "../../redux/modal/modal.actions";
import { setGroups } from "../../redux/groups/groups.actions";

import { getCurrentUser } from "../../local-storage/current-user";
import { getUserGroups } from "../../api/api.user";

import CardsList from "../../components/cards-list/cards-list";
import Button from "../../components/button/button";
import GroupJoin from "../../components/group-join/group-join";
import PageHeader from "../../components/page-header/page-header";

const Groups = ({ groups }) => {
	const [loadingGroups, setLoadingGroups] = useState(false);
	const [groupsMessage, setGroupsMessage] = useState("");
	const [groupsError, setGroupsError] = useState(false);

	const dispatch = useDispatch();

	const history = useHistory();

	const currentUser = getCurrentUser();

	useEffect(() => {
		document.title = "Groups";

		fetchUserGroups();
	}, []);

	const handleJoinGroupButtonClick = () => {
		dispatch(setModal(true, "", <GroupJoin />));
	};

	const fetchUserGroups = async () => {
		if (groups.length > 0) {
			return;
		}

		setLoadingGroups(true);
		setGroupsMessage("loading your groups...");

		try {
			const result = await getUserGroups(
				currentUser._id,
				currentUser.token
			);

			setGroupsMessage("");

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
		<div>
			<PageHeader title="your groups" info={currentUser.groups.length}>
				<Button
					type="secondary"
					size="smaller"
					clickHandler={() => history.push("/group/create")}
				>
					create group
				</Button>
			</PageHeader>

			<CardsList
				list={groups}
				listMessage={groupsMessage}
				loadingList={loadingGroups}
			/>

			<div className={styles.joinContainer}>
				<Button color="blue" clickHandler={handleJoinGroupButtonClick}>
					join group
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
	};
};

export default connect(mapStateToProps)(Groups);
