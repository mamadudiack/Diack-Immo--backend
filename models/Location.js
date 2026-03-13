const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property',
        required:true
    },

    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
        required:true
    },

    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    monthlyRent:{
        type:Number,
        required:true
    },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date
    },

    deposit:{
        type:Number
    }

},
{timestamps:true}

);

module.exports = mongoose.model('Location',locationSchema);