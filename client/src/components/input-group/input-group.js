import React from "react";

import styles from "./input-group.module.scss";

const InputGroup = ({
	label,
	labelInfo,
	type = "text",
	placeholder,
	value,
	error,
	displayType = "input",
	changeHandler,
}) => {
	console.log(value);

	const handleInputChange = (event) => {
		changeHandler(event.target.value);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				{labelInfo && (
					<span className={styles.labelInfo}>({labelInfo})</span>
				)}
			</label>
			{displayType === "input" ? (
				<input
					type={type}
					placeholder={placeholder}
					value={value}
					className={`${styles.input} ${styles.inputField} ${
						error && styles.errorInput
					}`}
					onChange={handleInputChange}
				/>
			) : (
				<textarea
					placeholder={placeholder}
					value={value}
					className={`${styles.input} ${styles.textarea} ${
						error && styles.errorInput
					}`}
					onChange={handleInputChange}
				></textarea>
			)}
			<span className={styles.error}>{error}</span>
		</div>
	);
};

export default InputGroup;
