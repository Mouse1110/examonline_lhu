var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.set('view engine','ejs');
app.set("views","./views");

// setup Socket
var server = require("http").Server(app);
var io = require("socket.io")(server);


const PORT = process.env.PORT || 5000;

server.listen(PORT);
var acc = require("./controllers/account.controller");
var logController = require("./controllers/log.controller");

app.get("/",function(req,res){
    res.render("login");
});

app.get("/log",function(req,res){
    logController.getLog().then(function(data){
        if (!data){
            res.json({err:1,data:null});
            return;
        }
        res.json({err:0,data:data});
    });
});
app.get("/log/user",function(req,res){
    logController.getCountUser().then(function(data){
        if (!data){
            res.json({err:1,data:null});
            return;
        }
        res.json({err:0,data:data});
    });
});

app.get("/log/exam",function(req,res){
    logController.getCountExam().then(function(data){
        if (!data){
            res.json({err:1,data:null});
            return;
        }
        res.json({err:0,data:data});
    });
});

app.get("/home",function(req,res){
    res.render("home");
});

var exam = require("./router/exam.router");
app.use("/exam",exam);

// Socket
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('msg',"hello user");
    socket.on('joinRoom',(data)=>{
        socket.join(data.room);
        io.to(data.room).emit('joinRoom',data.id);
        
    });
    socket.on("disconnect", () => {
        // socket.rooms.size === 0
      });
  });


// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://examonline:LPawViOyZu4hCs9G@cluster0.a4dtz.mongodb.net/examonline?retryWrites=true&w=majority',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

