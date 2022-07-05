const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    discordID: {
        type: String,
        required: [true, 'A Discord ID is required.']
    },
    token: {
        type: String,
        required: [true, 'An authorization token is required.']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;