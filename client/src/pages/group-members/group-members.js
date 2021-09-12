import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import styles from "./group-members.module.scss";

import {
	setGroupMembers,
	setNeedToFetch,
} from "../../redux/group-members/group-members.actions";

import { getGroupMembers } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";

import GenericSearch from "../../components/generic-search/generic-search";
import CardsList from "../../components/cards-list/cards-list";

const GroupMembers = ({ groupMembers, needToFetch }) => {
	const [membersToRender, setMembersToRender] = useState([]);
	const [fetchingMembers, setFetchingMembers] = useState(false);
	const [membersMessage, setMembersMessage] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	const dispatch = useDispatch();

	useEffect(() => {
		if (!needToFetch) {
			if (groupMembers.length === 0) {
				return setMembersMessage("this group has no members");
			}

			return;
		}

		fetchGroupMembers();
	}, []);

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
				dispatch(setGroupMembers(result.members));
				return dispatch(setNeedToFetch(false));
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
		groupMembers: state.groupMembers.members,
		needToFetch: state.groupMembers.needToFetch,
	};
};

export default connect(mapStateToProps)(GroupMembers);
