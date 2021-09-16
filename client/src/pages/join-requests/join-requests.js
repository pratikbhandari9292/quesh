import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./join-requests.module.scss";

import CardsList from "../../components/cards-list/cards-list";

const JoinRequests = ({ groups }) => {
	const [joinRequests, setJoinRequests] = useState([]);

	const params = useParams();

	const groupID = params.id;

	useEffect(() => {
		setJoinRequests(
			groups.find((group) => group._id === groupID).memberJoinRequests
		);
	}, [groups]);

	return (
		<div className={styles.container}>
			<CardsList
				list={joinRequests}
				listMessage={joinRequests.length > 0 ? "" : "no join requests"}
				loadingList={false}
				type="user"
				userCardType="join-request"
				messageAlign="left"
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
	};
};

export default connect(mapStateToProps)(JoinRequests);
