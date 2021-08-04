import React, { useEffect } from "react";
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	withRouter,
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { setCurrentUser as setCurrentUserRedux } from "./redux/current-user/current-user.actions";
import { getCurrentUser, setCurrentUser } from "./local-storage/current-user";

import "./styles/globals.scss";
import styles from "./styles/app.module.scss";
import wrapperStyles from "./styles/wrapper.module.scss";

import Header from "./components/header/header";
import Welcome from "./pages/welcome/welcome";
import SignIn from "./pages/sign-in/sign-in";
import Register from "./pages/register/register";
import SideBar from "./components/side-bar/side-bar";
import Groups from "./pages/groups/groups";
import Modal from "./components/modal/modal";
import CreateGroup from "./pages/create-group/create-group";
import Alert from "./components/alert/alert";
import GroupDetails from "./pages/group-details/group-details";
import SearchResults from "./pages/search-results/search-results";
import GroupExplore from "./pages/group-explore/group-explore";

const App = ({ currentUserRedux, location, history }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		//getting the currentUser from the local storage
		const currentUser = getCurrentUser();

		if (currentUser) {
			return dispatch(setCurrentUserRedux(true));
		}

		dispatch(setCurrentUserRedux(false));
	}, []);

	useEffect(() => {
		if (notInsideApp()) {
			if (currentUserRedux) {
				history.push("/groups/me");
			}
			return;
		}

		if (!currentUserRedux) {
			history.push("/signin");
		}
	}, [location, currentUserRedux]);

	const renderSideBar = () => {
		if (notInsideApp()) {
			return null;
		}

		return <SideBar />;
	};

	const notInsideApp = () => {
		return (
			location.pathname.includes("signin") ||
			location.pathname.includes("register") ||
			location.pathname === "/"
		);
	};

	return (
		<div className={styles.app}>
			<Header />
			<Modal />
			<Alert />
			<div className={notInsideApp() ? styles.mainWhole : styles.main}>
				{renderSideBar()}
				<Switch>
					<section
						className={`${
							notInsideApp()
								? wrapperStyles.wrapper
								: styles.content
						}`}
					>
						<Route path="/" exact>
							<Welcome />
						</Route>
						<Route path="/signin">
							<SignIn />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/groups/:id">
							<Groups />
						</Route>
						<Route path="/group/create" exact>
							<CreateGroup />
						</Route>
						<Route path="/group/details/:id">
							<GroupDetails />
						</Route>
						<Route path="/group/explore/:id">
							<GroupExplore />
						</Route>
						<Route path="/search">
							<SearchResults />
						</Route>
					</section>
				</Switch>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUserRedux: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(withRouter(App));
