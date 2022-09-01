const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const cors = require("cors")
const bodyParser = require("body-parser")

require("dotenv").config();

const app = express()
const PORT = process.env.PORT || 8070;

app.use(express.json())
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const UserModel = require("./models/Users")

mongoose.connect('mongodb+srv://firstDB:O9nO6fgixwroj5ye@cluster0.ybe7izx.mongodb.net/?retryWrites=true&w=majority');

app.get("/getUsers", async (req,res)=>{
    UserModel.find({}, (err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.post("/createUser", async (req,res)=>{
    const Uname = req.body.name;
    const Uage = req.body.age;
    const Uuname = req.body.username;

    const newUser = new UserModel({name: Uname, age: Uage, username:Uuname});
    try{
        await newUser.save()
        res.send("Inserted data")
    }catch(err){
        console.log(err);
    }
})

app.put("/upateUsers", async (req,res)=>{
   const id = req.body.id
   const newAge = req.body.newAge
   const newUsername = req.body.newUsername

   try{
        await UserModel.findById(id,(err,userToUpdate)=>{
            userToUpdate.age = Number(newAge)
            userToUpdate.username = newUsername
            userToUpdate.save();
        })
   }
   catch(err){
    console.log(err)
   }

   res.send("updated")

})

app.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
    await UserModel.findByIdAndRemove(id).exec()
    res.send("user deleted")
})

app.listen(PORT, ()=>{
    console.log(`server runs ${PORT}`)
})