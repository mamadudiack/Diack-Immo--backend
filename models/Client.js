const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },

    email:{
        type:String
    },

    phone:{
        type:String,
        required:true
    },

    clientType:{
        type:String,
        enum:['acheteur','vendeur','locataire']
    }

},
{timestamps});

module.exports = mongoose.model('Client',clientSchema);