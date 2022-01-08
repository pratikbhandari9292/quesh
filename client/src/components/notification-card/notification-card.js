import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./notification-card.module.scss";

import { getNotificationRenderInfo } from "../../utils/utils.notifications";
import { capitalizeFirstLetter } from "../../utils/utils.strings";
import { getHowLongAgo } from "../../utils/utils.date-time";

import ProfilePicture from "../profile-picture/profile-picture";

const NotificationCard = ({
    type,
    origin,
    notifAction,
    groupDest,
    question,
    createdAt,
}) => {
    const { text, link, irrelavant } = getNotificationRenderInfo({
        type,
        notifAction,
        origin,
        groupDest,
        question,
    });
    const history = useHistory();

    const handleNotificationClick = () => {
        if (link) {
            history.push(link);
        }
    };

    return (
        <div
            className={`${styles.notification} ${
                !link && styles.notificationNoLink
            }`}
            onClick={handleNotificationClick}
        >
            {origin && !irrelavant && (
                <ProfilePicture avatar={origin.avatar} size="smaller" />
            )}
            <div className={styles.divider}></div>
            <p>
                {capitalizeFirstLetter(text)}
                <span>.</span>
                <small>{getHowLongAgo(createdAt)}</small>
            </p>
        </div>
    );
};

export default NotificationCard;
