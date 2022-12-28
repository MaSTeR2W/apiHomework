const { default: mongoose } = require('mongoose');
const Employee = require('./../models/employeeModel');
const catchAsync = require('./../utilities/catchAsync');

const resObj = (status , data)=>{
    return{
        status,
        data:{
            data
        }
    }
}

exports.create = catchAsync(async(req , res , next)=>{
    const newEmp = await Employee.create(req.body);
    res.status(201).json(resObj('success' , newEmp));
});

exports.getAll = catchAsync(async(req , res , next)=>{
    const emps = await Employee.find();
    res.status(201).json(resObj('success' , emps));
});
exports.get = catchAsync(async(req , res , next)=>{
    const emp = await Employee.findById(req.params.id).populate('departmentID');
    res.status(200).json(resObj('success' , emp));
});

exports.delete = catchAsync(async(req , res , next)=>{
    const emp =  await Employee.findByIdAndDelete(req.params.id);
    res.status(204).json(resObj('success' , emp));
});

exports.update = catchAsync(async(req , res , next)=>{
    const body = req.body;
    delete body.id;
    const updatedEmp = await Employee.findByIdAndUpdate(req.params.id, body , {
        returnDocument:'after'
    });
    res.status(200).json(resObj('success' , updatedEmp));
});

