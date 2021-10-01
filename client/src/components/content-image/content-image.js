import React from "react";
import { useDispatch, connect } from "react-redux";

import styles from "./content-image.module.scss";

import { setImageViewer } from "../../redux/image-viewer/image-viewer.action";

import { ReactComponent as BackgroundImage } from "../../assets/icons/background-image.svg";

const ContentImage = ({ src, activeQuestion, fullScreen }) => {
	const dispatch = useDispatch();

	const handleContainerClick = () => {
		if (fullScreen) {
			return;
		}

		dispatch(setImageViewer(true, activeQuestion.images));
	};

	return (
		<div className={styles.container} onClick={handleContainerClick}>
			<BackgroundImage className={styles.backgroundImage} />
			<img src={src} alt="img" className={styles.image} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeQuestion: state.groupQuestions.activeQuestion,
	};
};

export default connect(mapStateToProps)(ContentImage);
