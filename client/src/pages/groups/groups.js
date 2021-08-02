import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./groups.module.scss";

import { setModalInfo } from "../../redux/modal/modal.actions";

import GroupsList from "../../components/groups-list/groups-list";
import Button from "../../components/button/button";
import GroupJoin from "../../components/group-join/group-join";

const Groups = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "Groups";
	});

	const handleJoinGroupButtonClick = () => {
		console.log("pratiic");
		dispatch(setModalInfo(true, "", <GroupJoin />));
	};

	return (
		<div>
			<GroupsList />

			<div className={styles.joinContainer}>
				<Button color="blue" clickHandler={handleJoinGroupButtonClick}>
					join group
				</Button>
			</div>
		</div>
	);
};

export default Groups;
