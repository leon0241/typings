const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

const mongo = "mongodb+srv://leon024:9zRcm0xw5wOcipba@leaderboard.eejxy.mongodb.net/Leaderboard?retryWrites=true&w=majority"

// let Schema = mongoose.Schema;

// let SomeModelSchema = new Schema({
//   name: String,
//   wpm: Number,
//   acc: Number
// });

mongoose.connect(mongo, {useNewUrlParser: true})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.sendFile('index.html');
});
 
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })