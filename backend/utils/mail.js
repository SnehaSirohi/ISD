const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const classScheduleMail = (
  subject,
  date,
  time,
  recieverEmail,
  name,
  message
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `${subject}'s class`,
      html: `Hello ${name} <br> ${subject}'s class scheduled on ${date} at ${time} <br> ${message} `,
    })
    .catch((err) => console.log(err));
};
const testScheduleMail = (
  subject,
  date,
  time,
  recieverEmail,
  name,
  message
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `${subject}'s Test`,
      html: `Hello ${name} <br> ${subject}'s test scheduled on ${date} at ${time} <br> ${message}`,
    })
    .catch((err) => console.log(err));
};

module.exports = { classScheduleMail, testScheduleMail };
