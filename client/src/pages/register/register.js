import React, { useState } from "react";

import formStyles from "../../styles/form.module.scss";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import Button from "../../components/button/button";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");

	const handleFormSubmit = (event) => {
		event.preventDefault();
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
					changeHandler={setUsername}
				/>
				<InputGroup
					label="email"
					value={email}
					changeHandler={setEmail}
				/>
				<InputGroup
					label="password"
					type="password"
					placeholder="minimum 7 characters"
					value={password}
					changeHandler={setPassword}
				/>
				<InputGroup
					label="retype password"
					type="password"
					value={repeatedPassword}
					changeHandler={setRepeatedPassword}
				/>
				<Button size="full">register</Button>
			</form>
		</div>
	);
};

export default Register;
