const nodemailer = require('nodemailer')
require("dotenv").config()

dotenv.config();

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

const sendEmail = (subject, date, time, recieverEmail) => {
	console.log(2, subject, date, time, recieverEmail);
	transport
		.sendMail({
			from: process.env.EMAIL,
			to: recieverEmail,
			subject: `${subject} class`,
			html: `${subject}'s class scheduled on ${date} at ${time}`,
		})
		.catch((err) => console.log(err));
};

module.exports= { sendEmail };