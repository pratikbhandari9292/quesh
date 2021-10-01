import React, { useRef } from "react";

import styles from "./file-selector.module.scss";

import { ReactComponent as ImageIcon } from "../../assets/icons/image.svg";

import Button from "../button/button";

const FileSelector = ({ files, error, changeHandler }) => {
	const fileSelectorRef = useRef();

	const handleSelectButtonClick = (event) => {
		event.preventDefault();

		fileSelectorRef.current.click();
	};

	return (
		<div>
			<input
				type="file"
				className={styles.fileSelector}
				ref={fileSelectorRef}
				onChange={changeHandler}
			/>
			<Button
				size="smaller"
				type="secondary"
				color="blue"
				clickHandler={handleSelectButtonClick}
			>
				<ImageIcon /> select image
			</Button>

			{files.length > 0 && (
				<div className={styles.filenames}>
					{files.map((file) => {
						return (
							<p
								className={styles.filename}
								key={`${file.name}${Date.now()}`}
							>
								{file.name}
							</p>
						);
					})}
				</div>
			)}

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default FileSelector;
