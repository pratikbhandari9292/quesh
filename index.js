const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//initializing server
const app = express();

//connecting to the database
mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("connected to the database successfully");
	}
);

//middlewares
app.use(express.json());

app.use("/api/user", require("./routes/auth"));
app.use("/api/group", require("./routes/group"));

//defining port number
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`the server is listening at the port ${port}`);
});
