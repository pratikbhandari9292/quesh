import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import styles from "./group-explore.module.scss";

import OptionsToggle from "../../components/options-toggle/options-toggle";
import Button from "../../components/button/button";
import GroupQuestions from "../../components/group-questions/group-questions";

const GroupExplore = () => {
	const [toggleOptions, setToggleOptions] = useState([
		{
			option: "unsolved",
			title: "unsolved",
			active: true,
		},
		{
			option: "solved",
			title: "solved",
			active: false,
		},
		{
			option: "all",
			title: "all",
			active: false,
		},
	]);

	const params = useParams();
	const history = useHistory();

	const groupID = params.id;

	const handleAskButtonClick = () => {
		history.push(`/group/${groupID}/ask`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.optionsToggle}>
				<OptionsToggle
					options={toggleOptions}
					setOptions={setToggleOptions}
				/>
			</div>

			<GroupQuestions />

			<div className={styles.askContainer}>
				<Button color="blue" clickHandler={handleAskButtonClick}>
					Ask Question
				</Button>
			</div>
		</div>
	);
};

export default GroupExplore;
