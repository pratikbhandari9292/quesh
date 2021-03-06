import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./group-details.module.scss";

import { getGroupDetails } from "../../api/api.group";
import { getCurrentUser } from "../../local-storage/current-user";
import { getDate } from "../../utils/utils.date-time";
import { capitalizeFirstLetter } from "../../utils/utils.strings";

import StatusMessage from "../../components/status-message/status-message";
import GroupInfo from "../../components/group-info/group-info";
import MembershipStatus from "../../components/membership-status/membership-status";
import ContentHeader from "../../components/content-header/content-header";

const GroupDetails = ({ groups, searchResults }) => {
	const [groupDetails, setGroupDetails] = useState(null);
	const [loadingDetails, setLoadingDetails] = useState(false);
	const [detailsMessage, setDetailsMessage] = useState("");

	const params = useParams();

	const groupID = params.id;

	const currentUser = getCurrentUser();

	useEffect(() => {
		fetchGroupDetails();
	}, []);

	useEffect(() => {
		if (groupDetails) {
			document.title = capitalizeFirstLetter(groupDetails.title);
		}
	}, [groupDetails]);

	const fetchGroupDetails = async () => {
		setLoadingDetails(true);
		setDetailsMessage("loading group details...");

		try {
			const result = await getGroupDetails(groupID, currentUser.token);

			if (result.error) {
				return setDetailsMessage(result.error);
			}

			setGroupDetails(result.group);
		} catch (error) {
			console.log(error);
		}
	};

	if (!groupDetails) {
		return (
			<StatusMessage message={detailsMessage} spinner={loadingDetails} />
		);
	}

	return (
		<div className={styles.container}>
			<ContentHeader title={groupDetails.title} />

			<div className={styles.groupDetailsGrid}>
				<div>
					<GroupInfo title="group description">
						{groupDetails.description}
					</GroupInfo>

					{groupDetails.about && (
						<GroupInfo title="this group is about">
							{groupDetails.about}
						</GroupInfo>
					)}

					<GroupInfo title="owner of the group">
						{groupDetails.owner.username}
					</GroupInfo>

					<GroupInfo title="created on">
						{getDate(groupDetails.createdAt)}
					</GroupInfo>

					<GroupInfo title="join requests">
						{groupDetails.memberJoinRequests.length}
					</GroupInfo>

					<GroupInfo title="members">
						{groupDetails.noOfMembers}
					</GroupInfo>
				</div>

				<MembershipStatus
					memberJoinRequests={groupDetails.memberJoinRequests}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.groups,
		searchResults: state.search.searchResults,
	};
};

export default connect(mapStateToProps)(GroupDetails);
