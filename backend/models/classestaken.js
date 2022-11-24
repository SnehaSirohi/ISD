const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesTaken = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("ClassesTaken", ClassesTaken);
