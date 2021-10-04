import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./group-explore.module.scss";

import {
	setDisplayType,
	setNeedToFetch,
} from "../../redux/group-questions/group-questions.actions";

import { activateOption } from "../../utils/utils.options-toggle";

import OptionsToggle from "../../components/options-toggle/options-toggle";
import Button from "../../components/button/button";
import GroupQuestions from "../../components/group-questions/group-questions";

const GroupExplore = ({ groupQuestions, displayType }) => {
	const [displayOptions, setDisplayOptions] = useState([
		{
			option: "all",
			title: "all",
			active: true,
		},
		{
			option: "solved",
			title: "solved",
			active: false,
		},
		{
			option: "unsolved",
			title: "unsolved",
			active: false,
		},
		{
			option: "mine",
			title: "mine",
			active: false,
		},
	]);

	const params = useParams();
	const history = useHistory();

	const dispatch = useDispatch();

	const groupID = params.id;

	useEffect(() => {
		setDisplayOptions(activateOption(displayOptions, displayType));
	}, [displayType]);

	const handleAskButtonClick = () => {
		history.push(`/group/${groupID}/ask`);
	};

	const handleOptionSelect = (option) => {
		dispatch(setDisplayType(option));
		dispatch(setNeedToFetch(true));
	};

	return (
		<div className={styles.container}>
			{groupQuestions.length > 0 && (
				<div className={styles.optionsToggle}>
					<OptionsToggle
						options={displayOptions}
						selectHandler={handleOptionSelect}
					/>
				</div>
			)}

			<GroupQuestions />

			<div className={styles.askContainer}>
				<Button color="blue" clickHandler={handleAskButtonClick}>
					Ask Question
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groupQuestions: state.groupQuestions.questions,
		displayType: state.groupQuestions.displayType,
	};
};

export default connect(mapStateToProps)(GroupExplore);
