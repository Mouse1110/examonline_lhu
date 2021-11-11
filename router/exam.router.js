
var express = require('express');
var accController = require("../controllers/account.controller");
var examController = require("../controllers/exam.controller");
var router = express.Router();


// Tìm sinh viên theo mã
router.get("/student",function(req,res){
    if (!req.query.s){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    accController.findStudent(req.query.s).then(function(data_Student){
        if(!data_Student){
            res.json({error:2,data:"không có dữ liệu"});
            return;
        }
        res.json({error:0,data:data_Student});
    });
    
});
//Lấy thông tin kỳ thi
router.get("/:id",function(req,res){
    examController.findID(req.params.id).then(function(data){
        if (data){
            res.json({error:0,data:data});          
            return;
        }
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
    });
});


// Lấy danh sách tất cả kỳ thi mà giáo viên đã khởi tạo
router.get("/",function(req,res){
    examController.findAll(function(data){
        if (data===[]){
            res.json({error:2,data:"không có dữ liệu"});
        return;
        }
        res.json({error:0,data:data});
    });
});
//Khởi tạo kỳ thi
router.post("/",function(req,res){
    if (req.body.name){
      examController.insert(req.body.name).then(function(id){
        if (id){
            res.json({error:0,data:id});
            return;
        } 
        res.json({error:4,data:"lỗi không lưu được dữ liệu"});
      });
    } else {
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
    }
});
// Lấy danh sách sinh viên trong kỳ thi
router.get("/student/:id",function(req,res){
    accController.findAllStudentOfExam(req.params.id).then(function(data){
        if (data === []){
            res.json({error:2,data:"không có dữ liệu"});
            return;
        }
        res.json({error:0,data:data});
    });
});
//Thêm sinh viên vào kỳ thi
router.post("/student/:id",function(req,res){
    if (!req.body.mssv){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    examController.insertStudent(req.params.id,JSON.parse(req.body.mssv)).then(function(result){
        console.log(result);
        if (result[0].modifiedCount>0){
            res.json({error:0,data:result[1]});
            return;
        } 
        res.json({error:4,data:"lỗi không lưu được dữ liệu"});
    });
});

router.delete("/student/:id",function(req,res){
    if (!req.body.mssv){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    var arrMSSV = JSON.parse(req.body.mssv);

    examController.deleteStudent(req.params.id,arrMSSV).then(function(result){
        if (result[0].modifiedCount>0){
            res.json({error:0,data:result[1]});
            return;
        } 
        res.json({error:4,data:"lỗi không lưu được dữ liệu"});
    });
});
// Set thời gian
router.post("/time/:id",function(req,res){
    if (!req.body.time || !req.body.timeStart){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }

    examController.insertTime(req.params.id,req.body.timeStart,req.body.time).then(function(result){
        if (result[0].modifiedCount>0){
            res.json({error:0,data:result[1]});
            return;
        }
        res.json({error:3,data:"dữ liệu đã tồn tại"});
    });
});

router.put("/time/:id",function(req,res){
    if (!req.body.time || !req.body.timeStart){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }

    examController.updateTime(req.params.id,req.body.timeStart,req.body.time).then(function(result){
        if (result[0].modifiedCount>0){
            res.json({error:0,data:result[1]});
            return;
        }
        res.json({error:4,data:"lỗi không lưu được dữ liệu"});
    });
});
// Thêm bài thi mới
router.post("/test/:id",function(req,res){
    if (!req.body.test ){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    examController.insertTest(req.params.id,req.body.test).then(function(result){
        if (result[0].modifiedCount>0){
            res.json({error:0,data:result[1]});
            return;
        }
        res.json({error:3,data:"dữ liệu đã tồn tại"});
    });
});
router.put("/test/:id",function(req,res){
    if (!req.body.test ){
        res.json({error:1,data:"dữ liệu truyền lên không đúng"});
        return;
    }
    examController.updateTest(req.params.id,req.body.test).then(function(result){
        if (result[0].modifiedCount>0){
            res.json({error:0,data:result[1]});
            return;
        }
        res.json({error:4,data:"lỗi không lưu được dữ liệu"});
    });
});
module.exports = router