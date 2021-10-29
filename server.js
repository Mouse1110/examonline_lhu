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
var acc = require("./controllers/account.controller");

app.get("/",function(req,res){
    acc.insert();
    res.render("login");
});

app.get("/home",function(req,res){
    res.render("home");
});

var exam = require("./router/exam.router");
app.use("/exam",exam);

// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://examonline:LPawViOyZu4hCs9G@cluster0.a4dtz.mongodb.net/examonline?retryWrites=true&w=majority',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

