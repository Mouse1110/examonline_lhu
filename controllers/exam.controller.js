
var express = require('express');
var router = express.Router();


var arrAccount = [{
    _id:1,
    name: "Nguyễn Đức Anh",
    phone:  "0723155672",
    email: "jla53226@zwoho.com",
    mssv: "160780",
},
{
    _id:2,
    name: "Hoàng Thiện Tân",
    phone:  "0912534786",
    email: "yar79483@zwoho.com",
    mssv: "105282",
},
{
    _id:3,
    name: "Lâm Thanh Hiền",
    phone:  "0673546296",
    email: "jla53226@zwoho.com",
    mssv: "74225",
},
{
    _id:4,
    name: "Lê Hoàng Anh",
    phone:  "0987572430",
    email: "jla53226@zwoho.com",
    mssv: "148403",
},
{
    _id:5,
    name: "Phan Thành Lân",
    phone:  "0785483459",
    email: "jla53226@zwoho.com",
    mssv: "148403",
},
{
    _id:6,
    name: "Đặng Ngọc Anh Khoa",
    phone:  "0785874839",
    email: "jla53226@zwoho.com",
    mssv: "161765",
},
{
    _id:7,
    name: "Huỳnh Ngọc Khánh An",
    phone:  "0865437658",
    email: "jla53226@zwoho.com",
    mssv: "156668",
},
{
    _id:8,
    name: "Phạm Anh",
    phone:  "09635499587",
    email: "jla53226@zwoho.com",
    mssv: "130857",
},
{
    _id:9,
    name: "Trần Tiến Long",
    phone:  "0765895643",
    email: "jla53226@zwoho.com",
    mssv: "132978",
},
{
    _id:10,
    name: "Nguyễn Thành Danh",
    phone:  "0877643345",
    email: "ynk24599@boofx.com",
    mssv: "11259",
}
];

var arrExam =[
    
];


// Tìm sinh viên theo mã
router.get("/student",function(req,res){
    if (!req.query.s){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
    }
    var data_Student= arrAccount.find(e=>e.mssv===req.query.s);
    if(!data_Student){
        res.json({error:2,data:"không có dữ liệu"});
    }
    res.json({error:0,data:data_Student});
});
//Lấy thông tin kỳ thi
router.get("/:id",function(req,res){
    var index = arrExam.findIndex(e=>e._id===parseInt(req.params.id));
    if (index!==-1){
        res.json({error:0,data:data_Exam[index]});
    } else {
        res.json({error:2,data:"không có dữ liệu"});
    }
});
// Lấy danh sách tất cả kỳ thi mà giáo viên đã khởi tạo
router.get("/",function(req,res){
    if(arrExam.length === 0){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    res.json({error:0,data:arrExam});
});
//Khởi tạo kỳ thi
router.post("/",function(req,res){
    if (req.body.name){
        var id = arrExam.length+1;
        var data = {_id:id,
            name:req.body.name,
            time:"",
            timeStart:"",
            test:"",
            students:[]
        };
        arrExam.push(data);
        res.json({error:0,data:id});
    } else {
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
    }
});
//Thêm sinh viên vào kỳ thi
router.post("/student/:id",function(req,res){
    if (!req.body.mssv){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var arrMSSV = JSON.parse(req.body.mssv);
    var index = arrExam.findIndex(e=>String(e._id)==req.params.id);
    console.log(index);
    if (index == -1){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    arrMSSV.forEach(element => {
       var acc= arrAccount.find(e=>e.mssv===element);
       if (acc){
           arrExam[index].students.push({idStudent:acc._id,answer:"",countRule:0});
       }
    });
    res.json({error:0,data:arrExam[index]});
});

router.delete("/student/:id",function(req,res){
    if (!req.body.mssv){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var arrMSSV = JSON.parse(req.body.mssv);
    var index = arrExam.findIndex(e=>String(e._id)==req.params.id);
    if (index == -1){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    arrMSSV.forEach(element => {
        var acc= arrAccount.find(e=>e.mssv===element);
        console.log(acc);
        if (acc){
          var i = arrExam[index].students.findIndex(e=>e.idStudent===acc._id);
          arrExam[index].students.splice(i,1); 
        }
     });
     res.json(res.json({error:0,data:arrExam[index]}));
});
// Set thời gian
router.post("/time/:id",function(req,res){
    if (!req.body.time || !req.body.timeStart){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var index = arrExam.findIndex(e=>String(e._id)===req.params.id);
    if (index===-1){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    if (arrExam[index].time!=="" &&  arrExam[index].timeStart !== "")
    {
        res.json({error:3,data:"dữ liệu đã tồn tại"});
    }
    arrExam[index].time = req.body.time;
    arrExam[index].timeStart = req.body.timeStart;
    res.json({error:0,data:arrExam[index]});
});

router.put("/time/:id",function(req,res){
    if (!req.body.time || !req.body.timeStart){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var index = arrExam.findIndex(e=>String(e._id)===req.params.id);
    if (index===-1){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    arrExam[index].time = req.body.time;
    arrExam[index].timeStart = req.body.timeStart;
    res.json({error:0,data:arrExam[index]});
});
// Thêm bài thi mới
router.post("/test/:id",function(req,res){
    if (!req.body.test ){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var index = arrExam.findIndex(e=>String(e._id)===req.params.id);
    if (index===-1){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    if (arrExam[index].test!=="" )
    {
        res.json({error:3,data:"dữ liệu đã tồn tại"});
    }
    arrExam[index].test = req.body.test;
    res.json({error:0,data:arrExam[index]});
});
router.put("/test/:id",function(req,res){
    if (!req.body.test ){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var index = arrExam.findIndex(e=>String(e._id)===req.params.id);
    if (index===-1){
        res.json({error:2,data:"không có dữ liệu"});
        return;
    }
    arrExam[index].test = req.body.test;
    res.json({error:0,data:arrExam[index]});
});
module.exports = router