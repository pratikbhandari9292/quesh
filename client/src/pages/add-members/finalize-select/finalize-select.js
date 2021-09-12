import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setModal, resetModal } from "../../../redux/modal/modal.actions";
import { displayAlert } from "../../../redux/alert/alert.actions";
import { updateGroup } from "../../../redux/groups/groups.actions";
import { resetAddMembers } from "../../../redux/add-members/add-members.actions";
import { setGroupMembers } from "../../../redux/group-members/group-members.actions";

import { addGroupMembers } from "../../../api/api.group";

import CardsList from "../../../components/cards-list/cards-list";
import AddControls from "../add-controls/add-controls";
import Spinner from "../../../components/spinner/spinner";

const FinalizeSelect = ({ selectedUsers }) => {
	const history = useHistory();
	const params = useParams();

	const groupID = params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		if (selectedUsers.length === 0) {
			history.goBack();
		}
	}, [selectedUsers]);

	const getTerm = () => {
		return selectedUsers.length > 1 ? "members" : "member";
	};

	const handleMembersAddition = async () => {
		try {
			dispatch(
				setModal(true, `adding ${getTerm()}...`, <Spinner />, false)
			);
			const result = await addGroupMembers(
				groupID,
				selectedUsers.map((selectedUser) => {
					return selectedUser.userID;
				})
			);

			if (result.error) {
				console.log(result.error);
				return;
			}

			dispatch(displayAlert(`${getTerm()} added`));
			dispatch(updateGroup(groupID, result.group));
			dispatch(setGroupMembers(selectedUsers));
			dispatch(resetAddMembers());
			history.push(`/group/${groupID}/explore`);
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	return (
		<div>
			<AddControls addHandler={handleMembersAddition} />
			<CardsList list={selectedUsers} type="user" userCardType="select" />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedUsers: state.addMembers.selectedUsers,
	};
};

export default connect(mapStateToProps)(FinalizeSelect);
