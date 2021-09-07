import React from "react";

import styles from "./cards-skeleton.module.scss";

const CardSkeleton = ({ type }) => {
	return (
		<div
			className={
				type === "group"
					? styles.groupSkeleton
					: styles.questionSkeleton
			}
		>
			{type === "group" ? (
				<p className={styles.title}></p>
			) : (
				<div className={styles.header}>
					<div className={styles.profile}></div>
					<div className={styles.subInfoSmallest}></div>
				</div>
			)}

			<p className={styles.subInfo}></p>
			<p className={styles.subInfoSmaller}></p>
			<p className={styles.subInfoSmall}></p>
		</div>
	);
};

const CardsSkeleton = ({ type }) => {
	return (
		<div
			className={
				type === "group"
					? styles.groupSkeletonContainer
					: styles.questionSkeletonContainer
			}
		>
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
