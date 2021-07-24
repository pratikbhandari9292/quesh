import React from "react";

import styles from "./input-group.module.scss";

const InputGroup = ({
	label,
	type = "text",
	placeholder,
	value,
	error,
	changeHandler,
}) => {
	const handleInputChange = (event) => {
		changeHandler(event.target.value);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				className={styles.input}
				onChange={handleInputChange}
			/>
			<span>{error}</span>
		</div>
	);
};

export default InputGroup;
