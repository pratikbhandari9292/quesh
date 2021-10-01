import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./groups.module.scss";

import { setModal } from "../../redux/modal/modal.actions";
import {
	setGroups,
	setLoadingGroups,
	setGroupsMessage,
	setNeedToFetch,
} from "../../redux/groups/groups.actions";

import { getCurrentUser } from "../../local-storage/current-user";
import { getUserGroups } from "../../api/api.group";

import CardsList from "../../components/cards-list/cards-list";
import Button from "../../components/button/button";
import GroupJoin from "../../components/group-join/group-join";
import PageHeader from "../../components/page-header/page-header";

const Groups = ({ groups, loadingGroups, groupsMessage, needToFetch }) => {
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
		if (!needToFetch) {
			return;
		}

		dispatch(setLoadingGroups(true));
		dispatch(setGroupsMessage("loading your groups..."));

		try {
			const result = await getUserGroups(
				currentUser._id,
				currentUser.token
			);

			dispatch(setGroupsMessage(""));

			if (result.groups) {
				dispatch(setNeedToFetch(false));
				return result.groups.length > 0
					? dispatch(setGroups(result.groups))
					: dispatch(
							setGroupsMessage(
								"you are not a member of any group"
							)
					  );
			}
		} catch (error) {
			dispatch(
				setGroupsMessage(
					"something went wrong, maybe some network problem."
				)
			);
			console.log(error);
		} finally {
			dispatch(setLoadingGroups(false));
		}
	};

	return (
		<div>
			<PageHeader
				title="your groups"
				info={currentUser.groups.length}
				capitalize={true}
				backArrow={false}
			>
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
		loadingGroups: state.groups.loadingGroups,
		groupsMessage: state.groups.groupsMessage,
		needToFetch: state.groups.needToFetch,
	};
};

export default connect(mapStateToProps)(Groups);
