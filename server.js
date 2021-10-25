var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.set('view engine','ejs');
app.set("views","./views");
const PORT = process.env.PORT || 5000;



var server = require("http").Server(app);
var is = require("socket.io")(server);
server.listen(PORT);


app.get("/",function(req,res){
    res.render("login");
});

app.get("/home",function(req,res){
    res.render("home");
});

var exam = require("./controllers/exam.controller");
app.use("/exam",exam);
