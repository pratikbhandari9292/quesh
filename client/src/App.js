import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import wrapperStyles from "./styles/wrapper.module.scss";

import "./styles/globals.scss";

import Header from "./components/header/header";
import Welcome from "./pages/welcome/welcome";
import SignIn from "./pages/sign-in/sign-in";
import Register from "./pages/register/register";

const App = () => {
	return (
		<React.Fragment>
			<BrowserRouter>
				<Header />
				<Switch>
					<section className={wrapperStyles.wrapper}>
						<Route path="/" exact>
							<Welcome />
						</Route>
						<Route path="/signin">
							<SignIn />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
					</section>
				</Switch>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
