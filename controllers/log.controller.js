const mongoose = require("mongoose");

const LogModel = require("../models/log.model");
const AccModel = require("../models/account.model");
const ExamModel = require("../models/exam.model");

module.exports.countLog = async function(name,method){
    var data= await LogModel.findOne({api:name});
    if (!data){
        var logNew = new LogModel({
            api:name,
            count:1,
            method:method,
        });
        await logNew.save();
       
        return;
    } 
    
    var log = await LogModel.updateOne({_id:data._id},{$set:{count:data.count+1}})
    return log;
}

module.exports.getLog = async function(){
    var data = await LogModel.find({});
    return data;
}

module.exports.getCountUser = async function(){
    var data = await AccModel.find({});
    return data.length;
}

module.exports.getCountExam = async function(){
    var data = await ExamModel.find({});
    return data.length;
}