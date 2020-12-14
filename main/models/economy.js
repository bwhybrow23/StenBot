const mongoose = require("mongoose");

const economySchema = new mongoose.Schema({
    discordID: {
        type: Number,
        required: [true, "A Discord ID is required."]
    },
    balance: {
        type: Number,
        default: 0,
        required: [true, "A balance for the user is required."]
    }
})

const Economy = mongoose.model("Economy", economySchema)
module.exports = Economy;