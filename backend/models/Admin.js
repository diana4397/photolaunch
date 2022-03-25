const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    password: {
        type: String
    },
    email: {
        type: String
    },
    is_super_admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = Admin = mongoose.model('admin', adminSchema);