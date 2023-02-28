const express = require('express')
const datas = require('../model/index');
const axios = require('axios');


exports.getData = async(req,res)=>{
    try{
        const myData = await datas.find();
        console.log(myData)
        res.send(myData);
        return res.status(200);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:"Failed to Fetch"
        })
    }
}

exports.getDatabyId = async(req,res)=>{
    try{
        const myData = await datas.findById(req.params.id);
        return res.status(200).json({
            success:true,
            data: myData
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:"Failed to Get"
        })
    }
}

exports.createNewData = async(req,res) =>{
    try{
        
        const newData = await datas.create(req.body);
        return res.status(201).json({
            success:true,
            data:newData
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:"Failed to create"
        })
    }
}

exports.importNewData = async(req,res) =>{
    try{
        console.log("helo");
        const dept = ["Ortho","ophthalmo","Cardio","Dental","Psychology"];
        //apis 
        await axios.get('https://randomuser.me/api/?results=250')
        .then((result)=>{
            apiDatas = result.data.results;
            apiDatas.map((data,index)=>{
                // const {gender,name:{first,title,last},email,dob:{age,date},picture:{large,medium,thumbnail},location:{city,state,coordinates:{latitude,longitude}}} = data;
                // const name = first+" "+title+" "+last;
                const newData = datas.create({
                    name:data.name.first+data.name.title+data.name.last,
                    key:index,
                    email:data.email,
                    gender:data.gender,
                    dob:data.dob.date,
                    age:data.dob.age,
                    picture:{
                        large:data.picture.large,
                        medium:data.picture.medium,
                        thumbnail:data.picture.thumbnail
                    },
                    dept:dept[Math.floor(Math.random()*4)],
                    phone:data.phone,
                    totalDays:{
                        leave:Math.floor(Math.random()*200),
                        permission:Math.floor(Math.random()*50),
                        present:Math.floor(Math.random()*600)
                    },
                    // location:data.location.city,
                    location:{
                        city:data.location.city,
                        state:data.location.state,
                        country:data.location.country,
                        postcode:data.location.postcode
                    },
                    idCard:{
                        idName:data.id.name,
                        idValue:data.id.value
                    },
                    patientsAttended:Math.floor(Math.random()*300),
                    Surgery:Math.floor(Math.random()*40),
                })
            })
        })
        .catch((err)=>{
            console.log(err);
        })
        // const newData = await datas.insertMany(allData);
        return res.status(201).json({
            success:true,
            data:apiDatas
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:"Failed to create"
        })
    }
}