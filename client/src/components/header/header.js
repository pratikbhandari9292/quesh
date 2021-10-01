import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./header.module.scss";
import wrapperStyles from "../../styles/wrapper.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import Logo from "../logo/logo";
import Button from "../button/button";
import ProfilePreview from "../profile-preview/profile-preview";
import GroupSearch from "../group-search/group-search";

const Header = ({ currentUserRedux, updates }) => {
	const currentUser = getCurrentUser();

	const history = useHistory();
	const location = useLocation();

	const renderButtons = () => {
		if (location.pathname.includes("signin")) {
			return (
				<Button
					type="secondary"
					clickHandler={handleRegisterButtonClick}
				>
					register
				</Button>
			);
		}

		if (
			location.pathname.includes("register") ||
			location.pathname === "/"
		) {
			return (
				<Button type="secondary" clickHandler={handleSignInButtonClick}>
					Sign In
				</Button>
			);
		}
	};

	const handleSignInButtonClick = () => {
		history.push("/signin");
	};

	const handleRegisterButtonClick = () => {
		history.push("/register");
	};

	return (
		<div className={styles.container}>
			<div className={`${wrapperStyles.wrapper} ${styles.wrapper}`}>
				<Logo />
				{currentUserRedux ? (
					<div className={styles.headerContent}>
						<GroupSearch />
						{currentUser && (
							<ProfilePreview
								username={currentUser.username}
								email={currentUser.email}
								avatar={currentUser.avatar}
							/>
						)}
					</div>
				) : (
					renderButtons()
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUserRedux: state.currentUser.currentUser,
		updates: state.currentUser.updates,
	};
};

export default connect(mapStateToProps)(Header);
