
$(document).ready(function(){
    var socket = io();
    socket.on("msg",function(msg){
        alert(msg);
        socket.emit("joinRoom",{id:'617a5b365abc58779a9c27da',room:'617a893aeb3825743169fd89'})
    });
    socket.on("joinRoom",function(msg){
        alert(msg);
    });
    
    $('#btnLogin').click(function(){
        var name = $("#inputName").val();
        var pass = $("#inputPass").val();
        if (name!=="admin" || pass !== "admin"){
            alert("Xin Hãy Thử Lại");
            return;
        }
        url = "http://examonlinelhu.herokuapp.com/home";
        window.location.replace(url);
    });
});
