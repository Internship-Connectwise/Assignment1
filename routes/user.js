const express = require('express');
const router = express.Router();

const f = require('@faker-js/faker');
const faker=f.faker;

const uschema=require('../model/user');

const fs=require("fs");

const users=[];

function createUser(){
    const user={
        name:faker.name.firstName(),
        email:faker.internet.email(),
        phone:faker.phone.number(),
        avatar: faker.image.avatar(),
        address:faker.address.streetAddress(),
        city:faker.address.city(),
        state:faker.address.state(),
        zip:faker.address.zipCode(),
        country:faker.address.country(),
        company:faker.company.companyName()
    }
    return user;
}


router.get('/',async(req,res)=>{
    try{
        const user=await uschema.find();
        res.json(user);
    }catch(err){
        console.log("Error "+err);
    }
})

router.get('/:cnt',async(req,res)=>{
    for(i=0;i<req.params.cnt;i++){
        users.push(createUser());
    }
    await uschema.insertMany(users).then(()=>{
        let fileContent='{"Users"='+JSON.stringify(users)+'}';
        fs.writeFileSync("./data/userdata.js",fileContent,(err)=>{
            if(err)
            console.log("Error: "+err)
            else{
                console.log("successfuly written to file")
            }
        })
        console.log("insertion successfull")
    })
    res.json(users);
})

module.exports=router; 