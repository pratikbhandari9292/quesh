import React, { useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

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

import PreviewContainer from "./preview-container/preview-container";

const ImageViewer = ({ show, images, currentlyDisplayed, imageSize }) => {
	const dispatch = useDispatch();

	const overlayRef = useRef(0);

	const overlayAnimation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.5 },
	};

	const imageAnimation = {
		right: {
			x: "100vw",
			opacity: 0,
		},
		visible: {
			x: "0vw",
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
		left: {
			x: "-100vw",
			opacity: 0,
		},
	};

	useEffect(() => {
		if (overlayRef.current) {
			overlayRef.current.focus();
		}
	}, [overlayRef.current, show]);

	const handleOverlayClick = (event) => {
		if (event.target.id === "overlay") {
			closeImageViewer();
		}
	};

	const closeImageViewer = () => {
		dispatch(resetImageViewer());
	};

	const handleLeftIndicatorClick = (event) => {
		dispatch(displayNextImage());
	};

	const handleRightIndicatorClick = (event) => {
		dispatch(displayPreviousImage());
	};

	const handleKeyPress = (event) => {
		switch (event.keyCode) {
			case 37:
				return dispatch(displayPreviousImage());
			case 39:
				return dispatch(displayNextImage());
			case 27:
				return dispatch(resetImageViewer());
			default:
				return;
		}
	};

	const displayImage = (src) => {
		return (
			<React.Fragment>
				<motion.img src={src} alt="img" className={styles.image} />
				<BackgroundImage
					className={`${imageStyles.backgroundImage} ${
						imageSize === "smaller" &&
						imageStyles.backgroundImageSmaller
					}`}
				/>
			</React.Fragment>
		);
	};

	return (
		<AnimatePresence
			initial={false}
			exitBeforeEnter={true}
			onExitComplete={() => null}
		>
			{show && (
				<motion.div
					className={styles.overlay}
					id="overlay"
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

					<motion.div
						className={styles.container}
						variants={imageAnimation}
						// initial="right"
						// animate="visible"
						// exit="left"
					>
						{displayImage(images[currentlyDisplayed])}
					</motion.div>

					{images.length > 1 && (
						<div className={styles.imagesPreview}>
							<PreviewContainer
								images={images}
								currentlyDisplayed={currentlyDisplayed}
							/>
						</div>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const mapStateToProps = (state) => {
	return {
		show: state.imageViewer.showViewer,
		images: state.imageViewer.images,
		currentlyDisplayed: state.imageViewer.currentlyDisplayed,
		imageSize: state.imageViewer.imageSize,
	};
};

export default connect(mapStateToProps)(ImageViewer);
