import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "./solution-menu.module.scss";

import {
	displayConfirmationModal,
	displayLoadingModal,
	resetModal,
} from "../../../redux/modal/modal.actions";
import { deleteSolution as deleteSolutionRedux } from "../../../redux/group-questions/group-questions.actions";
import { displayAlert } from "../../../redux/alert/alert.actions";

import { deleteSolution } from "../../../api/api.solution";
import { getCurrentUser } from "../../../local-storage/current-user";

import DotMenu from "../../dot-menu/dot-menu";
import DropdownItem from "../../dropdown-item/dropdown-item";

const SolutionMenu = ({ solutionID }) => {
	const dispatch = useDispatch();

	const location = useLocation();

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

			console.log(result);

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

	return (
		<div className={styles.container}>
			<DotMenu indicator="right">
				<DropdownItem type="danger" clickHandler={handleDeleteClick}>
					delete solution
				</DropdownItem>
			</DotMenu>
		</div>
	);
};

export default SolutionMenu;
