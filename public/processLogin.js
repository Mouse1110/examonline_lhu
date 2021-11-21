
$(document).ready(function(){

    $('#btnLogin').click(function(){
        var name = $("#inputName").val();
        var pass = $("#inputPass").val();
        if (name!=="admin" || pass !== "admin"){
            alert("Xin Hãy Thử Lại");
            return;
        }
        url = "http://examonlinelhu.herokuapp.com";
        window.location.replace(url);
    });

});
