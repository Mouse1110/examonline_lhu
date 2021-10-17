var express = require("express");
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("views","./views");

var server = require("http").Server(app);
var is = require("socket.io")(server);
server.listen(3000);


var exam = require("./controllers/exam.controller");
app.use("/exam",exam);
