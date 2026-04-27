const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    batchType:{
        type: String,
        enum: ['Kids', 'Adult'],
        required:true
    },
    monthlyFee:{
        type: Number,
        default: 1000,
        required:true
    },
    feesClearTill:{
        type:Date,
        default:Date.now
    },
    phoneNumber:{
        type:String,
    },
    joiningDate:{
        type: Date,
        default: Date.now()
    },

    paymentHistory: [
        {
            month: String,
            amountPaid: Number,
            dateOfPayment: Date,
            recordedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    status: {
        type: String,
        enum: ['Active', 'On Break', 'Left'],
        default: 'Active'
    }
});

module.exports = mongoose.model('Student', studentSchema);
