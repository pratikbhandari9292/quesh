import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import { getNotifications } from "../../api/api.notification";
import { getCurrentUser } from "../../local-storage/current-user";
import { setActiveGroupNotifications } from "../../redux/active-content/active-content.actions";

import CardsList from "../../components/cards-list/cards-list";

const GroupNotifications = ({ notifications, notificationsGroupID }) => {
    const [fetchingNotifs, setFetchingNotifs] = useState(false);
    const [notifsMessage, setNotifsMessage] = useState("");

    const { groupID } = useParams();
    const currentUser = getCurrentUser();
    const dispatch = useDispatch();

    useEffect(() => {
        if (groupID !== notificationsGroupID) {

            dispatch(setActiveGroupNotifications([]));
            fetchNotifications();
        }
    }, []);

    const fetchNotifications = async () => {
        try {
            setFetchingNotifs(true);
            const result = await getNotifications(
                { groupID },
                currentUser.token
            );

            if (result.notifications) {
                dispatch(setActiveGroupNotifications(groupID, result.notifications));

                if (result.notifications.length === 0) {
                    setNotifsMessage("this group has no notifications");
                }
            }
        } catch (error) {
        } finally {
            setFetchingNotifs(false);
        }
    };

    return (
        <div>
            <CardsList
                type="notification"
                list={notifications}
                listMessage={notifsMessage}
                loadingList={fetchingNotifs}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notifications: state.activeContent.activeGroupNotifications.notifications,
        notificationsGroupID: state.activeContent.activeGroupNotifications.groupID
    };
};

export default connect(mapStateToProps)(GroupNotifications);
