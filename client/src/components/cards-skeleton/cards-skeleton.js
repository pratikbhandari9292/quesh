import React from "react";

import styles from "./cards-skeleton.module.scss";

const CardSkeleton = ({ type }) => {
    const getClassName = () => {
        switch (type) {
            case "group":
                return styles.groupSkeleton;
            case "question":
                return styles.questionSkeleton;
            case "user":
                return styles.userSkeleton;
            case "notification":
                return styles.notificationSkeleton;
            default:
                return null;
        }
    };

    return (
        <div className={getClassName()}>
            {type === "group" && <p className={styles.title}></p>}

            {type === "question" && (
                <div className={styles.header}>
                    <div className={styles.profile}></div>
                    <div className={styles.subInfoSmallest}></div>
                </div>
            )}

            {(type === "user" || type === "notification") && (
                <div className={styles.user}>
                    <div className={styles.profile}></div>
                    {type === "user" ? (
                        <div className={styles.subInfoSmaller}></div>
                    ) : (
                        <div className={styles.subInfoSmall}></div>
                    )}
                </div>
            )}

            {(type !== "user" && type !== "notification") && (
                <React.Fragment>
                    <p className={styles.subInfo}></p>
                    <p className={styles.subInfoSmaller}></p>
                    <p className={styles.subInfoSmall}></p>
                </React.Fragment>
            )}
        </div>
    );
};

const CardsSkeleton = ({ type }) => {
    const getClassName = () => {
        switch (type) {
            case "group":
                return styles.groupSkeletonContainer;
            case "question":
                return styles.questionSkeletonContainer;
            case "user":
                return styles.userSkeletonContainer;
            default:
                return null;
        }
    };

    return (
        <div className={getClassName()}>
            <CardSkeleton type={type} />
            <CardSkeleton type={type} />
            <CardSkeleton type={type} />
            <CardSkeleton type={type} />
            <CardSkeleton type={type} />

            {type === "group" && (
                <React.Fragment>
                    <CardSkeleton type={type} />
                    <CardSkeleton type={type} />
                    <CardSkeleton type={type} />
                    <CardSkeleton type={type} />
                </React.Fragment>
            )}
        </div>
    );
};

export default CardsSkeleton;
