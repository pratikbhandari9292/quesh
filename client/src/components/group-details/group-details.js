import React from "react";

import styles from "./group-details.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

const GroupDetails = ({ title, owner, about, description, joinID }) => {
    const currentUser = getCurrentUser();
    const isOwner = currentUser._id === owner._id;

    return (
        <div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.infoItem}>
                <span className={styles.infoTitle}>owner</span>:{" "}
                <span className={styles.infoContent}>
                    {isOwner ? "me" : owner.username}{" "}
                    {!isOwner && <small>{owner.email}</small>}
                </span>
            </div>
            {about && (
                <div className={styles.infoItem}>
                    <span className={styles.infoTitle}>about</span>:{" "}
                    <span className={styles.infoContent}>{about}</span>
                </div>
            )}
            <div className={styles.infoItem}>
                <span className={styles.infoTitle}>description</span>:{" "}
                <span className={styles.infoContent}>
                    {description.length > 100
                        ? `${description.slice(0, 100)}...`
                        : description}
                </span>
            </div>
            <div className={styles.infoItem}>
                <span className={styles.infoTitle}>join id</span>:{" "}
                <span className={styles.infoContent}>{joinID}</span>
            </div>
        </div>
    );
};

export default GroupDetails;
