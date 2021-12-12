var SinhVienModel = require('../models/account.model');
var ExamModel = require("../models/exam.model");
module.exports.insert = function(){
    var sinhVienMoi = new SinhVienModel({
        user:"1",
        pass:"1",
        name:"1",
        phone:"1",
        email:"1",
        mssv:"1",
    });
    sinhVienMoi.save(function(err,result){
       if (err){
        console.log(err);
       } else {
           console.log(result._id);
       }
    });
}

module.exports.findStudent = async function(mssv){
  var data= await SinhVienModel.findOne({mssv:mssv});
  return data;
}

module.exports.findAllStudentOfExam = async function(id){
    var exam = await ExamModel.findById(id);
    if (exam.student.length === 0){
        return [];
    }
    var lIdStudent = exam.student.map(e=>
        e.idStudent
    );
    var data = await SinhVienModel.find({_id:{$in:lIdStudent}});
    return data;
}



module.exports.findAllExamOfStudent = async function(id){
    var exam = await ExamModel.find({});
    if (!exam){
        return [];
    }
    
    var lExam = [];
    exam.forEach(e=>{
        var index = e.student.findIndex(element=>`${element.idStudent}` === id);
        console.log(index);
        if (index > -1){
            lExam.push(e._id);
        }
    });
    return lExam;
}