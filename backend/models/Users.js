const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    address_line_1: {
        type: String
    },
    address_line_2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip_code: {
        type: Number
    },
    payment_status: {
        type: String
    },
    transaction_id: {
        type: String
    },
    promocode: {
        type: String
    },
    payable_amount: {
        type: Number
    },
    is_promocode_used: {
        type: Boolean,
        default: false
    },
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "schools"
    }
}, {
    timestamps: true
});

module.exports = User = mongoose.model('users', userSchema);