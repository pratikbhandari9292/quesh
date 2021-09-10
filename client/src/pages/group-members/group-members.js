import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import styles from "./group-members.module.scss";

import { getGroupMembers } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";
import { updateGroup } from "../../redux/groups/groups.actions";

import GenericSearch from "../../components/generic-search/generic-search";
import CardsList from "../../components/cards-list/cards-list";

const GroupMembers = ({ groups }) => {
	const [groupMembers, setGroupMembers] = useState([]);
	const [membersToRender, setMembersToRender] = useState([]);
	const [fetchingMembers, setFetchingMembers] = useState(false);
	const [membersMessage, setMembersMessage] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

	useEffect(() => {
		fetchGroupMembers();
	}, []);

	useEffect(() => {
		const currentGroup = groups.find((group) => group._id === groupID);

		if (currentGroup) {
			setGroupMembers(currentGroup.members);
		}
	}, [groups]);

	useEffect(() => {
		const optimizedSearchTerm = searchTerm.toLowerCase().trim();

		if (groupMembers) {
			setMembersToRender(
				groupMembers.filter((member) => {
					return (
						member.username.includes(optimizedSearchTerm) ||
						member.email.includes(optimizedSearchTerm)
					);
				})
			);
		}
	}, [searchTerm, groupMembers]);

	useEffect(() => {
		if (searchTerm && membersToRender.length === 0) {
			setMembersMessage("no user found");
		}

		if (!searchTerm || membersToRender.length > 0) {
			setMembersMessage("");
		}
	}, [searchTerm, membersToRender]);

	const fetchGroupMembers = async () => {
		setFetchingMembers(true);

		try {
			const result = await getGroupMembers(groupID, currentUser.token);

			if (result.error) {
				return;
			}

			if (result.members.length > 0) {
				return dispatch(
					updateGroup(groupID, { members: result.members })
				);
			}

			setMembersMessage("this group has no members");
		} catch (error) {
		} finally {
			setFetchingMembers(false);
		}
	};

	return (
		<div>
			<GenericSearch
				placeholder="username or email"
				value={searchTerm}
				changeHandler={setSearchTerm}
				size="bigger"
			/>

			<div className={styles.divider}></div>

			<CardsList
				list={membersToRender}
				loadingList={fetchingMembers}
				listMessage={membersMessage}
				type="user"
				messageAlign="left"
				userCardType="menu"
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
	};
};

export default connect(mapStateToProps)(GroupMembers);
