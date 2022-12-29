const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName:String
});



const Department = mongoose.model('department' , departmentSchema);

module.exports = Department;