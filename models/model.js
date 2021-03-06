const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let ScoresSchema = new Schema({
  name: String,
  wpm: Number,
  acc: Number
});

module.exports = mongoose.model("Scores", ScoresSchema);