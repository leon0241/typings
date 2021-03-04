require("dotenv").config()

const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const mongoose = require('mongoose')

//const mongo = "mongodb+srv://leon024:9zRcm0xw5wOcipba@leaderboard.eejxy.mongodb.net/Leaderboard?retryWrites=true&w=majority"

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

//const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected")
});

//Bind connection to error event (to get notification of connection errors)
// db.on('error', (error) => console.error(error));
// db.once("open", () => console.log("connected"))

// let Schema = mongoose.Schema;

// let ScoresSchema = new Schema({
//   name: String,
//   wpm: Number,
//   acc: Number
// });

// let ScoresModel = mongoose.model('ScoresModel', ScoresSchema);

app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
   res.sendFile('index.html');
});

app.post("/finish", (req, res) => {
  console.log(req.body)
  console.log("Name: " + req.body.name)
  console.log("WPM: " + req.body.wpm)
  console.log("Acc: " + req.body.acc)
  res.redirect("/")
})
 
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })