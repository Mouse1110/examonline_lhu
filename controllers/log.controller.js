const mongoose = require("mongoose");

const LogModel = require("../models/log.model");

module.exports.insert = async function(name,method){
    var logNew = new LogModel({
        api:name,
        count:0,
        method:method,
    });

    
}