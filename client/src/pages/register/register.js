import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import formStyles from "../../styles/form.module.scss";

import { signInOrRegister } from "../../api/api.user";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
	const [registering, setRegistering] = useState(false);

	const history = useHistory();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		setRegistering(true);

		clearFieldErrors();

		if (password !== repeatedPassword) {
			setPasswordError("these passwords do not match");
			setRepeatedPasswordError("these passwords do not match");
			return setRegistering(false);
		}

		try {
			const validationResult = await signInOrRegister("register", {
				username,
				email,
				password,
			});

			setRegistering(false);

			if (validationResult.error) {
				return setFieldErrors(validationResult.error);
			}

			history.push("/signin");
		} catch (error) {
			setRegistering(false);
			console.log(error);
		}
	};

	const clearFieldErrors = () => {
		setUsernameError("");
		setEmailError("");
		setPasswordError("");
		setRepeatedPasswordError("");
	};

	const setFieldErrors = (error) => {
		if (error.includes("username")) {
			return setUsernameError(error);
		}

		if (error.includes("email")) {
			return setEmailError(error);
		}

		if (error.includes("password")) {
			return setPasswordError(error);
		}
	};

	return (
		<div className={formStyles.container}>
			<FormHeader
				heading="register to quesh"
				subheading="already have an account?"
				link="sign in"
				linkTo="signin"
			/>
			<form className={formStyles.form} onSubmit={handleFormSubmit}>
				<InputGroup
					label="username"
					placeholder="minimum 5 characters"
					value={username}
					error={usernameError}
					changeHandler={setUsername}
				/>
				<InputGroup
					label="email"
					value={email}
					error={emailError}
					changeHandler={setEmail}
				/>
				<InputGroup
					label="password"
					type="password"
					placeholder="minimum 7 characters"
					value={password}
					error={passwordError}
					changeHandler={setPassword}
				/>
				<InputGroup
					label="retype password"
					type="password"
					value={repeatedPassword}
					error={repeatedPasswordError}
					changeHandler={setRepeatedPassword}
				/>
				<Button size="full">
					{registering ? (
						<React.Fragment>
							registering <Spinner color="white" />{" "}
						</React.Fragment>
					) : (
						"register"
					)}
				</Button>
			</form>
		</div>
	);
};

export default Register;
