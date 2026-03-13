const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    phone:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:['admin','agent'],
        default:'agent'
    }

   
},

{timestamps:true}
);

module.exports = mongoose.model('User',userSchema);