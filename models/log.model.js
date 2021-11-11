const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    api:String,
    count:Number,
    method:String
});

module.exports = logSchema.model("log",logSchema);