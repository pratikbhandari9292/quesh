import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory, useParams } from "react-router-dom";

import styles from "./solution-menu.module.scss";

import {
	displayConfirmationModal,
	displayLoadingModal,
	resetModal,
} from "../../../redux/modal/modal.actions";
import {
	deleteSolution as deleteSolutionRedux,
	updateActiveQuestion,
} from "../../../redux/group-questions/group-questions.actions";
import { displayAlert } from "../../../redux/alert/alert.actions";
import { setActiveSolution } from "../../../redux/solution/solution.actions";

import { approveSolution, deleteSolution } from "../../../api/api.solution";
import { getCurrentUser } from "../../../local-storage/current-user";

import DotMenu from "../../dot-menu/dot-menu";
import DropdownItem from "../../dropdown-item/dropdown-item";

const SolutionMenu = ({ solutionID, isOwner, solution }) => {
	const dispatch = useDispatch();

	const location = useLocation();
	const history = useHistory();
	const { groupID, questionID } = useParams();

	const currentUser = getCurrentUser();

	const type = location.pathname.includes("proposed-solutions")
		? "proposal"
		: "solution";

	const handleDeleteClick = () => {
		dispatch(
			displayConfirmationModal(
				"are you sure you want to delete this solution ?",
				handleSolutionDeletion
			)
		);
	};

	const handleSolutionDeletion = async () => {
		dispatch(displayLoadingModal("deleting solution..."));

		try {
			const result = await deleteSolution(
				solutionID,
				type,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			if (type === "solution") {
				dispatch(deleteSolutionRedux(type));
			} else {
				dispatch(deleteSolutionRedux(type, solutionID));
			}

			dispatch(displayAlert("solution deleted"));
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	const handleApproveClick = () => {
		const confirmationMessage = solution
			? "this proposed solution will replace the current solution"
			: "this proposed solution will be the main solution";

		dispatch(
			displayConfirmationModal(
				`${confirmationMessage}. Do you want to continue ?`,
				approvalHandler
			)
		);
	};

	const approvalHandler = async () => {
		dispatch(displayLoadingModal("approving solution..."));

		try {
			const result = await approveSolution(solutionID, currentUser.token);

			if (result.error) {
				return;
			}

			dispatch(updateActiveQuestion(result));
			dispatch(displayAlert("solution approved"));
			history.goBack();
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	const handleEditClick = () => {
		dispatch(setActiveSolution(solution));
		history.push(
			`/group/${groupID}/question/${questionID}/solution/${solutionID}/edit`
		);
	};

	return (
		<div className={styles.container}>
			<DotMenu indicator="right">
				{isOwner && solutionID !== solution._id && (
					<DropdownItem clickHandler={handleApproveClick}>
						approve solution
					</DropdownItem>
				)}

				<DropdownItem clickHandler={handleEditClick}>
					edit solution
				</DropdownItem>

				<DropdownItem type="danger" clickHandler={handleDeleteClick}>
					delete solution
				</DropdownItem>
			</DotMenu>
		</div>
	);
};

export default SolutionMenu;
