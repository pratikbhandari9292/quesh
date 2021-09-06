import React from "react";

import styles from "./cards-skeleton.module.scss";

const CardSkeleton = () => {
	return (
		<div className={styles.skeleton}>
			<p className={styles.title}></p>

			<p className={styles.subInfo}></p>
			<p className={styles.subInfo}></p>
			<p className={styles.subInfo}></p>
		</div>
	);
};

const CardsSkeleton = () => {
	return (
		<div className={styles.skeletonContainer}>
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</div>
	);
};

export default CardsSkeleton;
