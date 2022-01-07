import React from "react";

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
    const { text } = getNotificationRenderInfo({
        type,
        notifAction,
        origin,
        groupDest,
        question,
    });

    return (
        <div className={styles.notification}>
            { origin && <ProfilePicture avatar={origin.avatar} size="smaller" />}
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
