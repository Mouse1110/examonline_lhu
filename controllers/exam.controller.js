const mongoose = require("mongoose");
const ExamModel = require("../models/exam.model");
const StudentModel = require("../models/account.model");

const StudentInExamOTD = require("../models/OTD/studentInExam.otd");

module.exports.insert = async function(name){
    newExam = new ExamModel({
        name:name
    });
    var data = await newExam.save();

    return data._id;
}

module.exports.findID = async function(id){
   var data = await ExamModel.findById(id);
   return data;
}
module.exports.findAll = async function(){
    var data = await ExamModel.find();
    return data;
}

module.exports.insertStudent = async function(id,arrMSSV){
    var lStudent = await StudentModel.find({mssv:{$in:arrMSSV}});
    var lIdStudent = lStudent.map(e=>StudentInExamOTD(e._id));
    var log = await ExamModel.updateOne({_id:id},{$addToSet:{student:lIdStudent}});
    var data = await ExamModel.findById(id);
    return [log,data];
}

module.exports.deleteStudent = async function(id,arrMSSV){

    var lStudent = await StudentModel.find({mssv:{$in:arrMSSV}});
    var lIdStudent = lStudent.map(e=>e._id);
    var log = await ExamModel.updateOne({_id:id},{$pull:{student:{idStudent:{$in:lIdStudent}}}},{ safe: true },);
    var data = await ExamModel.findById(id);
    return [log,data];
}

module.exports.insertTime = async function(id,timeStart,time){
    var log = await ExamModel.updateOne({_id:id,time:{$exists:false}},{$set:{time:time,timeStart:timeStart}});
    var data = await ExamModel.findById(id);
    return [log,data];
}

module.exports.updateTime = async function(id,timeStart,time){
    var log = await ExamModel.updateOne({_id:id},{$set:{time:time,timeStart:timeStart}});
    var data = await ExamModel.findById(id);
    return [log,data];
}

module.exports.insertTest = async function(id,test){
    var log = await ExamModel.updateOne({_id:id,test:{$exists:false}},{$set:{test:test}});
    var data = await ExamModel.findById(id);
    return [log,data];
}

module.exports.updateTest = async function(id,test){
    var log = await ExamModel.updateOne({_id:id},{$set:{test:test}});
    var data = await ExamModel.findById(id);
    return [log,data];
}