import React from "react";

import formStyles from "../../styles/form.module.scss";

import InputGroup from "../../components/input-group/input-group";
import FormHeader from "../../components/form-header/form-header";
import Button from "../../components/button/button";

const SignIn = () => {
	return (
		<div className={formStyles.container}>
			<FormHeader
				heading="sign in to quesh"
				subheading="do not have an account?"
				link="register"
				linkTo="register"
			/>
			<form className={formStyles.form}>
				<InputGroup label="email" />
				<InputGroup
					label="password"
					type="password"
					placeholder="minimum 7 characters"
				/>
				<Button size="full">sign in</Button>
			</form>
		</div>
	);
};

export default SignIn;
