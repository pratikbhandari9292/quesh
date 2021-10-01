import React from "react";
import { connect, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { resetImageViewer } from "../../redux/image-viewer/image-viewer.action";

import styles from "./image-viewer.module.scss";

const ImageViewer = ({ show, images }) => {
	const dispatch = useDispatch();

	const overlayAnimation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.5 },
	};

	const handleOverlayClick = () => {
		closeImageViewer();
	};

	const closeImageViewer = () => {
		dispatch(resetImageViewer());
	};

	const handleContainerClick = (event) => {
		event.stopPropagation();
	};

	if (!show) {
		return null;
	}

	return (
		<motion.div
			className={styles.overlay}
			{...overlayAnimation}
			onClick={handleOverlayClick}
		>
			<div className={styles.container} onClick={handleContainerClick}>
				{images.map((image) => {
					return (
						<img
							src={image}
							alt="img"
							key={image}
							className={styles.image}
						/>
					);
				})}
			</div>
		</motion.div>
	);
};

const mapStateToProps = (state) => {
	return {
		show: state.imageViewer.showViewer,
		images: state.imageViewer.images,
	};
};

export default connect(mapStateToProps)(ImageViewer);
