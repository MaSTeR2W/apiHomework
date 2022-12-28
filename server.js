require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://localhost:27017/apiHomeWork').then((res)=>{
    console.log('dataBase is connected');
}).catch(err=>{
    console.log(err);
});
mongoose.set('strictQuery', true);

const port = process.env.PORT;

app.listen(port , ()=>{
    console.log('server is running on port 3200');
});