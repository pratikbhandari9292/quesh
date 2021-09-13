import React, { useState } from "react";

import styles from "./generic-search.module.scss";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const GenericSearch = ({
	placeholder,
	value,
	size,
	changeHandler,
	submitHandler,
}) => {
	const [focused, setFocused] = useState(false);

	const handleInputFocus = () => {
		setFocused(true);
	};

	const handleInputBlur = () => {
		setFocused(false);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (submitHandler) {
			submitHandler();
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div
				className={`${focused ? styles.searchFocused : styles.search} ${
					size === "bigger" && styles.searchBigger
				}`}
			>
				<input
					type="text"
					placeholder={placeholder}
					className={styles.input}
					value={value}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					onChange={(event) => {
						changeHandler(event.target.value);
					}}
				/>
				<button>
					<SearchIcon />
				</button>
			</div>
		</form>
	);
};

export default GenericSearch;
