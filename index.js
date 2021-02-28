const express = require("express")
const fs = require('fs')
const app = express()
const port = 3000

app.get("/", (request, response) => {
   fs.readFile("index.html", "utf8", (err, html) => {

      if (err) {
         response.status(500).send("sorry, out of order")
      }

      response.send(html);
   })
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})