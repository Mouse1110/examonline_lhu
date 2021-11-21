


$(document).ready(function(){
    var url = "http://examonlinelhu.herokuapp.com";
    $.get(url+"/log/user",function(data){
        if (data.err>0){
            return;
        }
        $("#countUser").text(`${data.data}`);
    });
    $.get(url+"/log/exam",function(data){
        if (data.err>0){
            return;
        }
        $("#countExam").text(`${data.data}`);
    });
    $.get( url+"/log", function( data ) {
        if (data.err>0){
            return;
        }
        data.data.forEach(element => {
            $("#lRequest").append(`<tr>
            <th scope="row">
              ${element.api}
            </th>
            <td>
              ${element.count}
            </td>
            <td>
              <i class="fas fa-arrow-up text-success mr-3"></i> ${element.method}
            </td>
          </tr>`);
        });
       
      });


});
