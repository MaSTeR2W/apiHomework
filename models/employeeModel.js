const mongoose = require('mongoose');
const Department = require('./departmentSchema');
const employeeSchema = new mongoose.Schema({
    employeeName:{
        type:String,
        required:[true , 'حقل الاسم مطلوب']
    },
    position:{
        type:String,
        required:[true , 'حقل المنصب مطلوب'],
        enum:{
            values:['مدير' , 'موظف' , 'مساعد مدير'],
            message:'القيمة المدخلة غير صحيحة'
        }
    },  
    age:{
        type:Number,
        required:[true , 'حقل العمر مطلوب'],
        min:[14 , 'لا نقبل موظفين بعمر أقل من 14 سنة'],
        max:[60 , 'لا نقبل موظفين بعمر يتجاوز 60 سنة']
    },  
    salary:{
        type:Number,
        required:[true , 'حقل الراتب مطلوب'],
        min:[0 , 'لا يمكن للراتب أن يكون أقل من 0 دينار'],
    },  
    departmentID:{
        type:mongoose.Schema.ObjectId,
        ref: 'department',
        required:[true , 'الرجاء تحديد القسم']
    }
});

const Employee = mongoose.model('employee' , employeeSchema);


module.exports = Employee;