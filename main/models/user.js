const mongoose = require('mongoose');
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    discordID: {
        type: Number,
        required: [true, "A Discord ID is required."],
        unique: true
    },
    token: {
        type: String,
        required: [true, "An authorization token is required."]
    }

}, { timestamps: true });

//Gen Auth Token
userSchema.methods.genAuthToken = async function () {
    const select = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let token = "";
    for (let x=0; x <= 30; x++) { 
        let ranInt = Math.floor(Math.random() * 62);
        token = token.concat(select[ranInt]);
    }
    token = hash(token, 11)
}

const User = mongoose.model("User", userSchema);
module.exports = User;