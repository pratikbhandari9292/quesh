import React, { useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
	displayNextImage,
	displayPreviousImage,
	resetImageViewer,
} from "../../redux/image-viewer/image-viewer.action";

import styles from "./image-viewer.module.scss";
import imageStyles from "../content-image/content-image.module.scss";

import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as BackgroundImage } from "../../assets/icons/background-image.svg";

const ImageViewer = ({ show, images, currentlyDisplayed }) => {
	const dispatch = useDispatch();

	const overlayRef = useRef(0);

	useEffect(() => {
		if (overlayRef.current) {
			overlayRef.current.focus();
		}
	}, [overlayRef.current]);

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

	const handleLeftIndicatorClick = () => {
		dispatch(displayNextImage());
	};

	const handleRightIndicatorClick = () => {
		dispatch(displayPreviousImage());
	};

	const handleKeyPress = (event) => {
		if (event.keyCode === 37) {
			dispatch(displayPreviousImage());
		}

		if (event.keyCode === 39) {
			dispatch(displayNextImage());
		}

		if (event.keyCode === 27) {
			dispatch(resetImageViewer());
		}
	};

	if (!show) {
		return null;
	}

	return (
		<motion.div
			className={styles.overlay}
			{...overlayAnimation}
			ref={overlayRef}
			onClick={handleOverlayClick}
			onKeyDown={handleKeyPress}
			tabIndex={-1}
		>
			{images.length > 1 && (
				<React.Fragment>
					<ArrowLeftIcon
						className={styles.indicatorLeft}
						onClick={handleLeftIndicatorClick}
					/>
					<ArrowRightIcon
						className={styles.indicatorRight}
						onClick={handleRightIndicatorClick}
					/>
				</React.Fragment>
			)}

			<div className={styles.container} onClick={handleContainerClick}>
				<img
					src={images[currentlyDisplayed]}
					alt="img"
					className={styles.image}
				/>
				<BackgroundImage className={`${imageStyles.backgroundImage}`} />
			</div>
		</motion.div>
	);
};

const mapStateToProps = (state) => {
	return {
		show: state.imageViewer.showViewer,
		images: state.imageViewer.images,
		currentlyDisplayed: state.imageViewer.currentlyDisplayed,
	};
};

export default connect(mapStateToProps)(ImageViewer);
