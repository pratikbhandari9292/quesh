import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import {
	selectUser,
	unselectUser,
} from "../../../redux/add-members/add-members.actions";

import Button from "../../button/button";

const SelectControl = ({ user, groupID, selectedUsers }) => {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setSelected(
			selectedUsers.find(
				(selectedUser) => selectedUser.userID === user.userID
			)
		);
	}, [selectedUsers]);

	const dispatch = useDispatch();

	const handleButtonClick = () => {
		if (!selected) {
			return dispatch(selectUser(user));
		}

		dispatch(unselectUser(user.userID));
	};

	const renderButton = () => {
		if (user.groups.find((group) => group._id === groupID)) {
			return (
				<Button size="smaller" disabled>
					already member
				</Button>
			);
		}

		return (
			<Button
				color="blue"
				type={selected && "secondary"}
				size="smaller"
				clickHandler={handleButtonClick}
			>
				{selected ? "unselect" : "select"}
			</Button>
		);
	};

	return <div>{renderButton()}</div>;
};

const mapStateToProps = (state) => {
	return {
		selectedUsers: state.addMembers.selectedUsers,
	};
};

export default connect(mapStateToProps)(SelectControl);
