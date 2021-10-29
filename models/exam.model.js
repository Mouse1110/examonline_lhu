const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    name:String,
    timeStart:String,
    time:String,
    test:Object,
    student:Array,
});

module.exports = mongoose.model('exam',examSchema);