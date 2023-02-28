const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
const app = express();
const datas = require('./model')
const {getData,getDatabyId,createNewData,importNewData} = require('./Controller/index');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

//connnecting to mongodb
// mongoose.connect(`${process.env.MONGODB_URL}`,{useNewUrlParser: true})
mongoose.connect('mongodb+srv://kavin:kavin@doctors.kwu6tfe.mongodb.net/mydatabase',{useNewUrlParser:true})
.then((result)=>{
    console.log("Connected to Db");
})
.catch((err)=>{
    console.log(err);
})

mongoose.set('strictQuery', false);



//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


//paths
app.get('/api/get',getData);
app.get('/api/get/:id',getDatabyId);
app.post('/api/post',createNewData);
app.post('/api/post/import',importNewData);


//listening to port
app.listen(5000,()=>{
    console.log("Running on the port");
})