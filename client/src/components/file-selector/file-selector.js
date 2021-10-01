import React, { useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./file-selector.module.scss";

import { resetFiles, selectFiles } from "../../redux/files/files.actions";

import { ReactComponent as ImageIcon } from "../../assets/icons/image.svg";

import Button from "../button/button";
import SelectedFile from "./selected-file/selected-file";

const FileSelector = ({
	label,
	text = "select image",
	selectedFiles = [],
	error,
}) => {
	const fileSelectorRef = useRef();

	const dispatch = useDispatch();

	const handleSelectButtonClick = (event) => {
		event.preventDefault();

		fileSelectorRef.current.click();
	};

	const handleFileChange = (event) => {
		dispatch(selectFiles(event.target.files));
	};

	useEffect(() => {
		return () => {
			dispatch(resetFiles());
		};
	}, []);

	return (
		<div>
			{label && <p className={styles.label}>{label}</p>}
			<input
				type="file"
				className={styles.fileSelector}
				ref={fileSelectorRef}
				onChange={handleFileChange}
			/>
			<Button
				size="smaller"
				type="secondary"
				color="blue"
				clickHandler={handleSelectButtonClick}
			>
				<ImageIcon /> {text}
			</Button>

			<div className={styles.divider}></div>

			{selectedFiles.length > 0 && (
				<div className={styles.filenames}>
					{selectedFiles.map((file, index) => {
						return (
							<SelectedFile
								name={file.name}
								index={index}
								key={`${file.name}${Date.now()}`}
							/>
						);
					})}
				</div>
			)}

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedFiles: state.files.selectedFiles,
	};
};

export default connect(mapStateToProps)(FileSelector);
