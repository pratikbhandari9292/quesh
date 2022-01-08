import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import {
    displayConfirmationModal,
    resetModal,
    setModal,
} from "../../../redux/modal/modal.actions";
import { removeGroup } from "../../../redux/groups/groups.actions";
import { displayAlert } from "../../../redux/alert/alert.actions";

import {
    getCurrentUser,
    removeUserGroup,
} from "../../../local-storage/current-user";
import { leaveGroup } from "../../../api/api.group";

import DropdownItem from "../../dropdown-item/dropdown-item";
import Spinner from "../../spinner/spinner";
import DotMenu from "../../dot-menu/dot-menu";
import GroupDetails from "../../group-details/group-details";
import { sendNotification } from "../../../api/api.notification";

const GroupMenu = ({ owner, activeGroup }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const groupID = params.id;
    const currentUser = getCurrentUser();

    const handleViewMembersClick = () => {
        history.push(`/group/${groupID}/members`);
    };

    const handleLeaveClick = () => {
        dispatch(
            displayConfirmationModal(
                "are you sure you want to leave the group ?",
                handleMemberLeave
            )
        );
    };

    const handleMemberLeave = async () => {
        dispatch(setModal(true, "leaving group...", <Spinner />, false));

        try {
            const result = await leaveGroup(groupID, currentUser.token);

            if (result.error) {
                return;
            }

            dispatch(removeGroup(groupID));
            removeUserGroup(groupID);
            dispatch(displayAlert("you have left the group"));

            //send a notification to the group
            const notificationInfo = {
                type: "group",
                notifAction: "leave group",
                groupDest: groupID,
                origin: currentUser._id,
            };
            sendNotification(notificationInfo, currentUser.token);

            history.push("/groups/me");
        } catch (error) {
        } finally {
            dispatch(resetModal());
        }
    };

    const handleDelegateClick = () => {
        history.push(`/group/${groupID}/delegate-ownership`);
    };

    const handleViewDetailsClick = () => {
        const { title, owner, about, createdAt, description, joinID } =
            activeGroup;
        dispatch(
            setModal(
                true,
                "",
                <GroupDetails
                    {...{ title, owner, about, createdAt, description, joinID }}
                />
            )
        );
    };

    return (
        <DotMenu indicator="right">
            <DropdownItem clickHandler={handleViewDetailsClick}>
                view details
            </DropdownItem>

            <DropdownItem clickHandler={handleViewMembersClick}>
                view members
            </DropdownItem>

            {currentUser._id !== owner ? (
                <DropdownItem type="danger" clickHandler={handleLeaveClick}>
                    leave group
                </DropdownItem>
            ) : (
                <DropdownItem clickHandler={handleDelegateClick}>
                    delegate ownership
                </DropdownItem>
            )}
        </DotMenu>
    );
};

const mapStateToProps = (state) => {
    return {
        activeGroup: state.activeContent.activeGroup,
    };
};

export default connect(mapStateToProps)(GroupMenu);
