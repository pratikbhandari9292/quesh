const express = require("express");

const Image = require("../models/Image");

const router = express.Router();

//get an image
router.get("/", async (request, response) => {
	let options = null;

	const userID = request.query.userID;

	if (userID) {
		options = { user: userID };
	}

	try {
		const image = await Image.findOne(options);

		if (!image) {
			return response.status(400).send({ error: "image not found" });
		}

		response.set("Content-Type", "image/jpg");

		response.send(image.binary);
	} catch (error) {
		response.status(500).send({ error: error.message });
	}
});

module.exports = router;
