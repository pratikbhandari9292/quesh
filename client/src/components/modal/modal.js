import React from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./modal.module.scss";

import { setModal } from "../../redux/modal/modal.actions";

import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";

import Button from "../../components/button/button";

const Modal = ({ modalInfo, closable }) => {
	const { showModal, modalTitle, modalChildren, clickHandler } = modalInfo;

	console.log(clickHandler);

	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(setModal(false, ""));
	};

	const handleWrapperClick = (event) => {
		if (!closable) {
			return;
		}

		if (event.target.id === "wrapper") {
			closeModal();
		}
	};

	if (!showModal) {
		return null;
	}

	return (
		<div
			className={styles.wrapper}
			id="wrapper"
			onClick={handleWrapperClick}
		>
			<div className={styles.container}>
				{closable && (
					<CrossIcon className={styles.icon} onClick={closeModal} />
				)}

				{clickHandler ? (
					<React.Fragment>
						<p className={styles.title}>{modalTitle}</p>

						<div className={styles.buttons}>
							<Button
								size="smaller"
								color="blue"
								clickHandler={clickHandler}
							>
								yes i am
							</Button>
							<Button
								size="smaller"
								type="secondary"
								clickHandler={closeModal}
							>
								no
							</Button>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						{modalTitle && (
							<p className={styles.message}> {modalTitle} </p>
						)}
						{modalChildren}
					</React.Fragment>
				)}
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
