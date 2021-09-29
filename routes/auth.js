const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
	validateUserRegistration,
	validateUserSignIn,
} = require("../validation/user.validation");

const router = express.Router();

//create a new account
router.post("/register", async (request, response) => {
	const userInfo = request.body;

	const error = validateUserRegistration(userInfo);

	if (error) {
		return response.status(400).send({ error });
	}

	//checking to see if the user already exists
	const userExists = await User.findOne({ email: userInfo.email });

	if (userExists) {
		return response
			.status(400)
			.send({ error: "user with this email already exists" });
	}

	//generating a hash for the password
	const salt = await bcrypt.genSalt(9);
	const hash = await bcrypt.hash(userInfo.password, salt);

	//creating a new user instance
	const user = new User({
		...userInfo,
		password: hash,
		avatar: `https://avatars.dicebear.com/api/initials/${userInfo.username}.svg`,
	});

	try {
		//saving the user to the database
		const savedUser = user.save();

		response.status(201).send({ message: "user created" });
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

//log user in
router.post("/signin", async (request, response) => {
	const userInfo = request.body;

	const error = validateUserSignIn(userInfo);

	if (error) {
		return response.status(400).send({ error });
	}

	//getting a user with the given email
	const user = await User.findOne({ email: userInfo.email });

	if (!user) {
		return response
			.status(400)
			.send({ error: "email or password incorrect" });
	}

	//validating the password
	const validPassword = await bcrypt.compare(
		userInfo.password,
		user.password
	);

	if (!validPassword) {
		return response
			.status(400)
			.send({ error: "email or password incorrect" });
	}

	//creating a token
	const token = jwt.sign({ id: user._id }, process.env.SECRET);

	//sending user info along with the token
	response.send({
		user: {
			_id: user._id,
			username: user.username,
			email: user.email,
			groups: user.groups,
			avatar: user.avatar,
			token,
		},
	});
});

module.exports = router;
