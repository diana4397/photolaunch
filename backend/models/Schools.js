const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    name: {
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
    contact_name: {
        type: String
    },
    contact_email: {
        type: String
    },
    code: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = Schools = mongoose.model('schools', schoolSchema);