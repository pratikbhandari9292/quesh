import React from "react";
import { connect } from "react-redux";

import styles from "./alert.module.scss";

const Alert = ({ alertInfo }) => {
	const { showAlert, alertText, success } = alertInfo;

	console.log(showAlert);

	if (!showAlert) {
		return null;
	}

	return (
		<div className={success ? styles.alert : styles.alertFailure}>
			{alertText}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		alertInfo: state.alert.alertInfo,
	};
};

export default connect(mapStateToProps)(Alert);
