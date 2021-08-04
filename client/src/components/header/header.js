import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import styles from "./header.module.scss";
import wrapperStyles from "../../styles/wrapper.module.scss";

import { setCurrentUser as setCurrentUserRedux } from "../../redux/current-user/current-user.actions";
import {
	setCurrentUser,
	getCurrentUser,
} from "../../local-storage/current-user";

import Logo from "../logo/logo";
import Button from "../button/button";
import ProfilePicture from "../profile-picture/profile-picture";
import ProfilePreview from "../profile-preview/profile-preview";
import GroupSearch from "../group-search/group-search";

const Header = ({ currentUserRedux }) => {
	const history = useHistory();
	const location = useLocation();

	const dispatch = useDispatch();

	const currentUser = getCurrentUser();

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
						<ProfilePreview
							username={currentUser && currentUser.username}
							email={currentUser && currentUser.email}
						/>
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
	};
};

export default connect(mapStateToProps)(Header);
