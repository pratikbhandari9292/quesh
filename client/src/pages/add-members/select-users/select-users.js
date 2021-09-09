import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import styles from "./select-users.module.scss";

import {
	setSearchedUsers,
	setShowUsers,
	setSearchTerm as setSearchTermRedux,
} from "../../../redux/add-members/add-members.actions";

import { searchUser } from "../../../api/api.user";

import GenericSearch from "../../../components/generic-search/generic-search";
import CardsList from "../../../components/cards-list/cards-list";
import AddControls from "../add-controls/add-controls";

const SelectUsers = ({
	selectedUsers,
	searchedUsers,
	showUsers,
	searchTermRedux,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [usersMessage, setUsersMessage] = useState("");
	const [searching, setSearching] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		setSearchTerm(searchTermRedux);
	}, []);

	const handleFormSubmit = async () => {
		if (!searchTerm) {
			return;
		}

		try {
			setSearching(true);
			dispatch(setShowUsers(true));
			dispatch(setSearchedUsers([]));
			setUsersMessage("");
			dispatch(setSearchTermRedux(searchTerm));

			const result = await searchUser(searchTerm);

			if (result.error) {
				return;
			}

			if (result.users.length > 0) {
				return dispatch(setSearchedUsers(result.users));
			}
			setUsersMessage("no user found");
		} catch (error) {
		} finally {
			setSearching(false);
		}
	};

	return (
		<div className={styles.container}>
			<GenericSearch
				placeholder="username or email"
				value={searchTerm}
				changeHandler={setSearchTerm}
				submitHandler={handleFormSubmit}
			/>

			<AddControls />

			<div className={styles.divider}></div>

			{showUsers && (
				<CardsList
					list={searchedUsers}
					listMessage={usersMessage}
					loadingList={searching}
					type="user"
					userCardType="select"
					messageAlign="left"
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		searchedUsers: state.addMembers.searchedUsers,
		showUsers: state.addMembers.showUsers,
		searchTermRedux: state.addMembers.searchTerm,
	};
};

export default connect(mapStateToProps)(SelectUsers);
