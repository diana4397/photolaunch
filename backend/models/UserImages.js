const mongoose = require('mongoose')

const userImgSchema = new mongoose.Schema({
    image: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: Number, // 0 - uploaded, 1- accepted , 2- rejected
        default: 0
    }
}, {
    timestamps: true
});

module.exports = UserImages = mongoose.model('userimages', userImgSchema);