const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:['maison','appartement'],
        required:true
    },

    status:{
        type:String,
        enum:['a_vendre','a_louer','vendu','loue'],
        default:'a_vendre'
    },

    price:{
        type:Number,
        required:true
    },

    surface:{
        type:Number
    },

    address:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    image: {
            type:String,
        }
    

 

},
{timestamps:true}
);

module.exports = mongoose.model('Property',propertySchema);