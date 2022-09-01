const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({  
    name : {
        type : String,         
        required: true
    },
    age : {
        type : Number,
        required: true
    },
    username : {
        type : String,
        required: true
    }
});  


const UserModel = mongoose.model("users", Userschema);
module.exports = UserModel;