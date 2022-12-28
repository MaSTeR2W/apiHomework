const express = require('express');
const cors = require('cors');
const app = express();

const employeeController = require('./controllers/employeeController');
const Department = require('./models/departmentSchema');
const catchAsync = require('./utilities/catchAsync');

const options = {}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors(options));
app.set('view engine' , 'ejs');

app.get('/' , catchAsync(async(req , res , next)=>{
    const departments = await Department.find();
    res.render('home' , {departments});
}));
app.get('/api/departments' , catchAsync(async(req , res , next)=>{
    const departments = await Department.find();
    res.json({status:'success' , data:{data:departments}});
}));
app.get('/api/employees' , employeeController.getAll);
app.post('/api/employees' , employeeController.create);

app.get('/api/employees/:id' , employeeController.get);
app.delete('/api/employees/:id' , employeeController.delete);
app.patch('/api/employees/:id' , employeeController.update);


app.use((err , req , res , next)=>{
    let messages = err.message.replace(/, /g , ',').replace(/: /g , ':').split(':');
    messages.shift();
    messages = messages.join(':').split(/[:,]/);
    if(messages.includes('departmentID')) messages[(messages.indexOf('departmentID') + 1)] = 'قيمة المعرف غير صحيحة'
    res.status(400).json({status:'fail',data:{data:messages}});
});

app.all('*' , (req , res , next)=>{
    res.status(404).send("<div style='margin:15px'><h1>Error 404</h1><h5>Cann't Find the Page</h5></div>");
});

module.exports = app;