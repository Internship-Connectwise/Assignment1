const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
//starting express app
const app = express();
app.use(express.json())

//connecting to mongodb

//express framework will be connecting to mongodb and mongodb will be connecting to db which is user in this case
//const url=`mongodb://localhost:${port}/users`;
//to avoid warning given while using deprecated methods we are enabling useNewUrlParser
//mongoose.connect(url,{useNewUrlParser:true});
//connection handler

mongoose.connect('mongodb://localhost:27017/test',(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('connected to mongodb');
    }
});
const con = mongoose.connection;
//checking if connection is successful or not
// con.on('open',()=>{
//     console.log('connected to mongodb');
// })


//using middleware
const userRouter = require('./routes/user.js');
app.use('/user',userRouter);

//checking if connection is successful and server is up and running
app.listen(port,(req,res)=>{
    console.log("server is running on port",port);
})