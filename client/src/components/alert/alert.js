import React from "react";
import { connect } from "react-redux";

import styles from "./alert.module.scss";

import { capitalizeFirstLetter } from "../../utils/utils.strings";

import { ReactComponent as TickIcon } from "../../assets/icons/tick.svg";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";

const Alert = ({ alertInfo }) => {
	const { showAlert, alertText, success } = alertInfo;

	if (!showAlert) {
		return null;
	}

	return (
		<div className={success ? styles.alert : styles.alertFailure}>
			{success ? <TickIcon /> : <CrossIcon />}
			{capitalizeFirstLetter(alertText)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		alertInfo: state.alert.alertInfo,
	};
};

export default connect(mapStateToProps)(Alert);
