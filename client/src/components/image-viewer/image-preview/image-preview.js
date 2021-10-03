import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./image-preview.module.scss";
import imageStyles from "../../../styles/image.module.scss";

import { setCurrentlyDisplayed } from "../../../redux/image-viewer/image-viewer.action";
import {
	displayLoadingModal,
	resetModal,
} from "../../../redux/modal/modal.actions";
import { updateActiveQuestion } from "../../../redux/group-questions/group-questions.actions";
import { updateActiveSolution } from "../../../redux/solution/solution.actions";

import { deleteImage } from "../../../api/api.image";
import { getCurrentUser } from "../../../local-storage/current-user";

import { ReactComponent as CrossIcon } from "../../../assets/icons/cross.svg";

import Button from "../../button/button";
import Spinner from "../../spinner/spinner";

const ImagePreview = ({
	src,
	index,
	active,
	removeHandler,
	contentType,
	contentID,
}) => {
	const [removing, setRemoving] = useState(false);

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

	const handleContainerClick = (event) => {
		dispatch(setCurrentlyDisplayed(index));
	};

	const handleRemoveClick = async (event) => {
		event.preventDefault();

		setRemoving(true);
		// dispatch(displayLoadingModal("removing image..."));

		try {
			const result = await deleteImage(
				contentID,
				contentType,
				src,
				currentUser.token
			);

			if (result.error) {
				return;
			}

			if (contentType === "question") {
				dispatch(updateActiveQuestion(result));
			}

			if (contentType === "solution") {
				dispatch(updateActiveSolution(result));
			}
		} catch (error) {
		} finally {
			// dispatch(resetModal());
			setRemoving(false);
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.imageContainer} ${
					active && styles.imageContainerActive
				}`}
				onClick={handleContainerClick}
			>
				<img src={src} alt="img" className={imageStyles.image} />
			</div>

			{removeHandler && (
				<div
					className={styles.iconContainer}
					onClick={handleRemoveClick}
				>
					{removing ? (
						<Spinner size="smaller" />
					) : (
						<CrossIcon className={styles.icon} />
					)}
				</div>
			)}
		</div>
	);
};

export default ImagePreview;
