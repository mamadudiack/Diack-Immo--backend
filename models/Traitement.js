const mongoose = require('mongoose');

const traitementSchema = new mongoose.Schema({
    traitementType: {
        type: String,
        enum: ['location', 'vente'],
        required: true
    },

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    //  POUR VENTE
    salePrice: {
        type: Number,
        required: function () {
            return this.traitementType === 'vente';
        }
    },

    //  POUR LOCATION
    rentPrice: {
        type: Number,
        required: function () {
            return this.traitementType === 'location';
        }
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: function () {
            return this.traitementType === 'location';
        }
    },
    status: {
      type: String,
      enum: ["en_attente", "valide", "refuse","pending_payment","paid"],
      default: "en_attente"
}

}, { timestamps: true });

module.exports = mongoose.models.Traitement || mongoose.model('Traitement', traitementSchema);