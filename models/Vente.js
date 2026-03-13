const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({

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

    salePrice:{
        type:Number,
        required:true
    },

    saleDate:{
        type:Date,
        default:Date.now
    },

    paymentMethod:{
        type:String,
        enum:['cash','bank','mobile']
    }

});

module.exports = mongoose.model('Location',venteSchema);