import React from "react";
import { useDispatch } from "react-redux";

import styles from "./selected-file.module.scss";

import { ReactComponent as CrossIcon } from "../../../assets/icons/cross.svg";
import { unselectFile } from "../../../redux/files/files.actions";

const SelectedFile = ({ name, index }) => {
	const dispatch = useDispatch();

	const handleDeleteClick = () => {
		dispatch(unselectFile(name));
	};

	return (
		<div className={styles.container}>
			<p className={styles.filename}>
				{index + 1}. {name}
			</p>
			<CrossIcon className={styles.icon} onClick={handleDeleteClick} />
		</div>
	);
};

export default SelectedFile;
