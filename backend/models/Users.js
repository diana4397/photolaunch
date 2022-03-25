const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
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
    customer_id: {
        type: String
    },
    promocode: {
        type: String
    },
    is_promocode_used: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = User = mongoose.model('users', userSchema);