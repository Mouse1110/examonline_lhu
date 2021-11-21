const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    api:String,
    count:Number,
    method:String
});

module.exports = mongoose.model("log",logSchema);