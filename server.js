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
var io = require("socket.io")(server,{
    cors: {
        origin: ["http://localhost:8081","http://localhost:8080"],
      }
});


var room = [];

var user = [];

const PORT = process.env.PORT || 5000;

server.listen(PORT);
var acc = require("./controllers/account.controller");
var logController = require("./controllers/log.controller");
var AccountController = require("./controllers/account.controller");
var ExamController = require("./controllers/exam.controller");

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

app.post("/login",function(req,res){
    if (!req.body.user || !req.body.pass){
        res.json({err:1,data:{}});
        return;
    }
    AccountController.login(req.body.user,req.body.pass).then(function(data){
        if (!data){
            res.json({err:2,data:{}});
            return;
        }

        res.json({err:0,data:data});
    });
})

var exam = require("./router/exam.router");
app.use("/exam",exam);

// Socket
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('msg',"hello user");

    socket.on('joinRoom',(data)=>{
      var index= room.findIndex(e=>data.room);
        if (index === -1){
            room.push(data.room);
        }
        socket.join(data.room);
            
        user.push({
            room:data.room,
            id:data.id,
            socket:socket.id,
            owner:data.isTeacher
        });
        console.log(user);
    ExamController.getTest(data.room).then(function(value){
        if (!value){
            return;
        }
        socket.emit('joinRoom',value);
    });
    });

    socket.on('user',(data)=>{
        var index= room.findIndex(e=>data.room);
          if (index === -1){
              room.push(data.room);
              socket.join(data.room);
              io.to(data.room).emit('joinRoom',data.id);
              ExamController.findOwner(data.id,data.room).then(function(check){
                  user.push({
                      room:data.room,
                      id:data.id,
                      socket:socket.id,
                      owner:check
                  });
                  console.log(user);
              });
          }
      });
    socket.on("disconnect", () => {
      var index= user.findIndex(e=>e.socket === socket.id);
      if (index>-1){
          user.splice(index,1);
      }
      console.log(user);
      });
  });



// Mongoose
const mongoose = require('mongoose');
const accountModel = require("./models/account.model");
mongoose.connect('mongodb+srv://examonline:LPawViOyZu4hCs9G@cluster0.a4dtz.mongodb.net/examonline?retryWrites=true&w=majority',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

