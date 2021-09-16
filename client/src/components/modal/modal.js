import React from "react";
import { connect, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./modal.module.scss";

import { setModal } from "../../redux/modal/modal.actions";
import { animations } from "./modal.animations";

import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";

import Button from "../../components/button/button";

const Modal = ({ modalInfo, closable }) => {
	const { showModal, modalTitle, modalChildren, clickHandler } = modalInfo;

	const getAnimation = () => {
		return animations[Math.floor(Math.random() * 5)];
	};

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

	return (
		<AnimatePresence
			initial={false}
			exitBeforeEnter={true}
			onExitComplete={() => null}
		>
			{showModal && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.wrapper}
					id="wrapper"
					onClick={handleWrapperClick}
				>
					<motion.div
						variants={getAnimation()}
						initial="hidden"
						animate="visible"
						exit="exit"
						className={styles.container}
					>
						{closable && (
							<CrossIcon
								className={styles.icon}
								onClick={closeModal}
							/>
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
									<p className={styles.message}>
										{modalTitle}
									</p>
								)}
								{modalChildren}
							</React.Fragment>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const mapStateToProps = (state) => {
	return {
		modalInfo: state.modal.modalInfo,
		closable: state.modal.closable,
	};
};

export default connect(mapStateToProps)(Modal);
