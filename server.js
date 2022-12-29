require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb+srv://MaSTeR:lQFFkIjmJFiJZ29F@cluster0.vbqtqer.mongodb.net/?retryWrites=true&w=majority').then((res)=>{
    console.log('dataBase is connected');
}).catch(err=>{
    console.log(err);
});
mongoose.set('strictQuery', true);

const port = process.env.PORT || 3200;

app.listen(port , ()=>{
    console.log('server is running on port 3200');
});