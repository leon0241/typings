// dotenv - Returning values from a .env file
require("dotenv").config()
// ExpressJS - website stuff
const express = require('express')
// Formidable middleware - parsing multipart form data
const formidableMiddleware = require('express-formidable');

// Initialise express and packages
const app = express()
const mongoose = require('mongoose')

// Temporary port to open
const port = 3000

//const mongo = "mongodb+srv://leon024:pass@leaderboard.eejxy.mongodb.net/Leaderboard?retryWrites=true&w=majority"

// Setup mongoose connection thing with value from .env
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

// Actually connect to mongoose
const db = mongoose.connection;
// If error then log connection error message
db.on('error', console.error.bind(console, 'connection error:'));
// If no error then log connected message
db.once('open', () => console.log("Connected"));

// Define mongoose schema creator
const Schema = mongoose.Schema;
 
// Define new schema for player
let ScoresSchema = new Schema({
  name: String,
  wpm: Number,
  acc: Number
});

// Define model with ScoresSchema
let Scores = mongoose.model("Scores", ScoresSchema);


// Get file directory from express
app.use(express.static(__dirname + '/public'));
// Use express-formidable
app.use(formidableMiddleware());

// On page load:
app.get('/', (req, res) => {
  //send file index.html to user
  req.sendFile('index.html');
});

// On finish post request: 
app.post("/finish", (req, res) => {
  // Define dictionary with parsed field data
  let fieldDict = req.fields

  // If name is blank, set name to "Anon"
  if (fieldDict.name === "") {
    fieldDict.name = "Anon"
  }

  // Create new document with schema and dict values
  let userScore = new Scores({
    name: fieldDict.name,
    wpm: fieldDict.wpm,
    acc: fieldDict.acc
  })

  // Save document to collection
  userScore.save(function (err) {
    if (err) {
      console.log(handleError(err));
    }
    console.log("saved?")
    // saved!
  });

})

// Listen for port and log the port it is listening to
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})