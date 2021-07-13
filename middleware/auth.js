const jwt = require("jsonwebtoken");

const auth = (request, response, next) => {
	const token = request.header("auth-token");

	//checking to see if a token has been provided
	if (!token) {
		return response.status(401).send({ error: "token not provided" });
	}

	//checking to see if the provided token is valid
	const tokenVerified = jwt.verify(token, process.env.SECRET);

	if (!tokenVerified) {
		return response.status(401).send({ error: "token is not valid" });
	}

	request.user = tokenVerified.id;

	next();
};

module.exports = { auth };
