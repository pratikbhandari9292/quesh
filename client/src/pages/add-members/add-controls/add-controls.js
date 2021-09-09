import React from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useHistory, useParams } from "react-router-dom";

import styles from "./add-controls.module.scss";

import { clearSelectedUsers } from "../../../redux/add-members/add-members.actions";

import Button from "../../../components/button/button";

const AddControls = ({ addHandler, selectedUsers }) => {
	const location = useLocation();
	const history = useHistory();
	const params = useParams();

	const groupID = params.id;

	const dispatch = useDispatch();

	if (selectedUsers.length === 0) {
		return null;
	}

	const handleClearAllClick = () => {
		dispatch(clearSelectedUsers());
	};

	return (
		<div className={styles.container}>
			{location.pathname.includes("select") ? (
				<Button
					color="blue"
					size="smaller"
					clickHandler={() => {
						return history.push(
							`/group/${groupID}/add-members/finalize`
						);
					}}
				>
					continue
				</Button>
			) : (
				<React.Fragment>
					<Button
						color="blue"
						size="smaller"
						clickHandler={addHandler}
					>
						{selectedUsers.length > 1
							? "add members"
							: "add member"}
					</Button>
				</React.Fragment>
			)}
			<p className={styles.selectInfo}>
				selected - {selectedUsers.length}
			</p>
			<p className={styles.clearAll} onClick={handleClearAllClick}>
				clear all
			</p>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedUsers: state.addMembers.selectedUsers,
	};
};

export default connect(mapStateToProps)(AddControls);
