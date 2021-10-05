const sgMail = require("@sendgrid/mail");
const fs = require("fs");

const getTemplate = (fileName) => {
	return fs.readFileSync(__dirname + `/${fileName}.html`, {
		encoding: "utf8",
	});
};

const welcomeTemplate = getTemplate("welcome");
const newQuestionTemplate = getTemplate("new-question");
const questionSolvedTemplate = getTemplate("question-solved");

const emailApiKey = process.env.MONGO_URL;

sgMail.setApiKey(emailApiKey);
sgMail.setSubstitutionWrappers("{{", "}}");

const getMsg = (email, subject) => {
	return {
		to: email,
		from: "pratikbhandari99999@gmail.com",
		subject,
	};
};

const sendSignedUpEmail = (username, email) => {
	sgMail.send({
		...getMsg(email, "welcome to quesh"),
		html: welcomeTemplate,
		substitutions: {
			username: username,
		},
	});
};

const sendNewQuestionEmail = (group, author, owner) => {
	sgMail.send({
		...getMsg(owner, "New question"),
		html: newQuestionTemplate,
		substitutions: {
			author,
			group,
		},
	});
};

const sendQuestionSolvedEmail = (group, question, author, user) => {
	sgMail.send({
		...getMsg(user, "Question solved"),
		html: questionSolvedTemplate,
		substitutions: {
			group,
			question: question || "no title",
			author,
		},
	});
};

module.exports = {
	sendSignedUpEmail,
	sendNewQuestionEmail,
	sendQuestionSolvedEmail,
};
