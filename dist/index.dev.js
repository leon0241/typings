"use strict";

var express = require("express");

var fs = require('fs');

var app = express();
var port = 3000;
app.get("/", function (request, response) {
  fs.readFile("index.html", "utf8", function (err, html) {
    if (err) {
      response.status(500).send("sorry, out of order");
    }

    response.send(html);
  });
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});