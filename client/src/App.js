import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { setCurrentUser as setCurrentUserRedux } from "./redux/current-user/current-user.actions";
import { getCurrentUser, setCurrentUser } from "./local-storage/current-user";

import "./styles/globals.scss";
import wrapperStyles from "./styles/wrapper.module.scss";

import Header from "./components/header/header";
import Welcome from "./pages/welcome/welcome";
import SignIn from "./pages/sign-in/sign-in";
import Register from "./pages/register/register";
import HomePage from "./pages/home-page/home-page";

const App = ({ currentUserRedux }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		//getting the currentUser from the local storage
		const currentUser = getCurrentUser();

		if (currentUser) {
			return dispatch(setCurrentUserRedux(true));
		}

		dispatch(setCurrentUserRedux(false));
	}, []);

	return (
		<React.Fragment>
			<BrowserRouter>
				<Header />
				<Switch>
					<section className={wrapperStyles.wrapper}>
						<Route path="/" exact>
							{currentUserRedux ? (
								<Redirect to="/home" />
							) : (
								<Welcome />
							)}
						</Route>
						<Route path="/signin">
							{currentUserRedux ? (
								<Redirect to="/home" />
							) : (
								<SignIn />
							)}
						</Route>
						<Route path="/register">
							{currentUserRedux ? (
								<Redirect to="/home" />
							) : (
								<Register />
							)}
						</Route>
						<Route path="/home">
							<HomePage />
						</Route>
					</section>
				</Switch>
			</BrowserRouter>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUserRedux: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(App);
