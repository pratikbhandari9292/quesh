import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./modal.module.scss";

import { setModalInfo } from "../../redux/modal/modal.actions";

import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";

const Modal = ({ modalInfo, closable }) => {
	const { showModal, modalTitle, modalChildren } = modalInfo;

	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(setModalInfo(false, ""));
	};

	if (!showModal) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{closable && (
					<CrossIcon className={styles.icon} onClick={closeModal} />
				)}
				{modalTitle && <h3 className={styles.title}> {modalTitle} </h3>}
				{modalChildren}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		modalInfo: state.modal.modalInfo,
		closable: state.modal.closable,
	};
};

export default connect(mapStateToProps)(Modal);
