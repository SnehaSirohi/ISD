const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleInfoClass = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ScheduleInfoClass", ScheduleInfoClass);
