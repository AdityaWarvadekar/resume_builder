const mongoose = require('mongoose');

const userSchema = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    resumes: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}

module.exports = mongoose.model('user', userSchema);