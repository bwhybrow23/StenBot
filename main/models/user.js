const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    discordID: {
        type: Number,
        required: [true, "A Discord ID is required."]
    },
    token: {
        type: String,
        required: [true, "An authorization token is required."]
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;