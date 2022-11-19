const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sem3Attendance = new Schema({
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  attendanceStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sem3Attendance", Sem3Attendance);
