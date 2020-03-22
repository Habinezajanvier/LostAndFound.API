const mongoose = require('mongoose');

const foundSchema = mongoose.Schema({
    documentType:{
        type: String,
        required: true
    },
    documentNumber: {
        type: String
    },
    owner:{
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
        },
        email: {type: String}
    },
    whoFound: {
        fullName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {type: String}
    },
    location: {
        lostPlace: {
            type: String,
        },
        pickingPlace: {
            type: String,
        }
    },
    status: {
        isLost: {
            type: Boolean,
            default:false
        },
        isFound: {
            type: Boolean,
            default:false
        },
        isDelivered:{
            type: Boolean,
            default: false
        }
    },
    requireReward: {
        type: Boolean,
        required: true,
        default: false
    },
    price: {
        type: Number,
        required: function() {return this.requireReward; }
    }

});

module.exports = mongoose.model('LostDocuments', foundSchema);