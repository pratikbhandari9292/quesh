import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { setUserNotifications } from "../../redux/user-notifications/user-notifications.actions";

import { getNotifications } from "../../api/api.notification";
import { getCurrentUser } from "../../local-storage/current-user";

import PageHeader from "../../components/page-header/page-header";
import CardsList from "../../components/cards-list/cards-list";

const UserNotifications = ({ notifications, needToFetch }) => {
    const [fetchingNotifs, setFetchingNotifs] = useState(false);
    const [notifsMessage, setNotifsMessage] = useState("");

    const currentUser = getCurrentUser();
    const dispatch = useDispatch();

    useEffect(() => {
        if (needToFetch) {
            dispatch(setUserNotifications([]));
            fetchNotifications();
        }
    }, []);

    const fetchNotifications = async () => {
        setFetchingNotifs(true);
        const result = await getNotifications("user", {}, currentUser.token);
        setFetchingNotifs(false);

        if (result.notifications) {
            dispatch(setUserNotifications(result.notifications));

            if (result.notifications.length === 0) {
                setNotifsMessage("you have no notifications");
            }
        }
    };

    return (
        <div>
            <PageHeader
                title="your notifications"
                capitalize
                info={notifications.length}
            />
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
        notifications: state.userNotifications.notifications,
        needToFetch: state.userNotifications.needToFetch,
    };
};

export default connect(mapStateToProps)(UserNotifications);
