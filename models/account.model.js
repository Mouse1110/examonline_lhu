const mongoose = require("mongoose");

const sinhVienSchema = new mongoose.Schema({
    user:String,
    pass:String,
    name:String,
    phone:String,
    email:String,
    mssv:String,
});

module.exports = mongoose.model('account',sinhVienSchema);