import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./edit-profile.module.scss";
import formStyles from "../../styles/form.module.scss";

import {
	displayAlert,
	displayErrorAlert,
} from "../../redux/alert/alert.actions";
import { incrementUserUpdates } from "../../redux/current-user/current-user.actions";
import { resetModal, setModal } from "../../redux/modal/modal.actions";

import {
	getCurrentUser,
	updateCurrentUser,
} from "../../local-storage/current-user";
import { updateUserProfile } from "../../api/api.user";
import { deleteImage } from "../../api/api.image";

import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";

import InputGroup from "../../components/input-group/input-group";
import FormHeader from "../../components/form-header/form-header";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import Button from "../../components/button/button";
import FileSelector from "../../components/file-selector/file-selector";
import Spinner from "../../components/spinner/spinner";

const EditProfile = ({ updates, selectedFiles }) => {
	const currentUser = getCurrentUser();

	const [username, setUsername] = useState(currentUser.username);
	const [usernameError, setUsernameError] = useState("");
	const [avatarError, setAvatarError] = useState("");

	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		document.title = "Edit your profile";
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		clearFieldErrors();

		dispatch(setModal(true, "editing profile...", <Spinner />, false));

		try {
			const result = await updateUserProfile(
				currentUser._id,
				{ username, avatar: selectedFiles[0] },
				currentUser.token
			);

			if (result.error) {
				return renderError(result.error);
			}

			updateUser(result.user, "profile edited");
			history.push("/groups/me");
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	const renderError = (error) => {
		if (error.includes("username")) {
			return setUsernameError(error);
		}

		if (error.includes("supported") || error.includes("large")) {
			setAvatarError(error);
		}
	};

	const clearFieldErrors = () => {
		setUsernameError("");
		setAvatarError("");
	};

	const handleRemoveAvatarClick = async () => {
		dispatch(setModal(true, "removing avatar...", <Spinner />, false));

		try {
			const result = await deleteImage(
				currentUser._id,
				"user",
				currentUser.avatar,
				currentUser.token
			);

			if (result.error) {
				dispatch(displayErrorAlert());
			}

			updateUser(result.user, "avatar removed");
		} catch (error) {
		} finally {
			dispatch(resetModal());
		}
	};

	const updateUser = (updateInfo, updateMessage) => {
		updateCurrentUser(updateInfo);
		dispatch(incrementUserUpdates());
		dispatch(displayAlert(updateMessage));
	};

	return (
		<div className={formStyles.container}>
			<FormHeader heading="edit your profile" backArrow={true} />

			<div className={styles.profilePictureContainer}>
				<ProfilePicture
					avatar={currentUser.avatar}
					size="bigger"
					expand={true}
					rounded={false}
				/>

				<div className={styles.divider}></div>
				<FileSelector error={avatarError} noLimit />

				<div className={styles.divider}></div>

				{!currentUser.avatar.includes("dicebear") && (
					<Button
						size="smaller"
						type="secondary"
						clickHandler={handleRemoveAvatarClick}
					>
						<CrossIcon /> remove avatar
					</Button>
				)}
			</div>

			<form onSubmit={handleFormSubmit}>
				<InputGroup
					label="username"
					value={username}
					error={usernameError}
					changeHandler={setUsername}
				/>
				<Button size="full">edit profile</Button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		updates: state.currentUser.updates,
		selectedFiles: state.files.selectedFiles,
	};
};

export default connect(mapStateToProps)(EditProfile);
