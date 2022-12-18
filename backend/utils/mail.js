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
  teacher,
  message
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `${subject}'s class`,
      html: `Hello ${name} <br> ${teacher} has scheduled the class of ${subject} on ${date} at ${time}. <br> ${message}. `,
    })
    .catch((err) => console.log(err));
};
const testScheduleMail = (
  subject,
  date,
  time,
  recieverEmail,
  name,
  teacher,
  message
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `${subject}'s Test`,
      html: `Hello ${name} <br> ${teacher} has scheduled the test of ${subject} on ${date} at ${time}. <br> ${message}.`,
    })
    .catch((err) => console.log(err));
};
const AssignmentMail = (
  subject,
  deadline,
  recieverEmail,
  name,
  teacher,
  message
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `Assignment Posted`,
      html: `Hello ${name} <br> ${teacher} has posted an assignment of ${subject} on classopedia. <br> The deadline of assignment submission is ${deadline}. <br> ${message}.`,
    })
    .catch((err) => console.log(err));
};
const StudyMaterialMail = (
  subject,
  recieverEmail,
  name,
  teacher,
  message
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `Study Material Posted`,
      html: `Hello ${name} <br> ${teacher} has posted some study material of ${subject} on classopedia.<br> ${message}.`,
    })
    .catch((err) => console.log(err));
};
const MonthlyMail = (
  name,
  recieverEmail,
  totalclasses,
  attendance,
  monthname,
  percentage
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `Attendance Report of ${monthname}`,
      html: `Hello ${name} <br> Total Classes held : ${totalclasses} <br> Total classes attended : ${attendance} <br> Attendance Percentage : ${percentage}%`,
    })
    .catch((err) => console.log(err));
};
const WarningMail = (
  name,
  recieverEmail,
  monthname
) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: recieverEmail,
      subject: `Alert`,
      html: `Hello ${name} <br> Your attendance percentage in ${monthname} is lesser than 50%. <br> Kindly start attending the classes.`,
    })
    .catch((err) => console.log(err));
};

module.exports = { classScheduleMail, testScheduleMail,AssignmentMail,StudyMaterialMail,MonthlyMail,WarningMail };
