const mongoose = require("mongoose");

const economySchema = new mongoose.Schema({
  discordID: {
    type: String,
    required: [true, "A Discord ID is required."],
    unique: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0,
    required: [true, "A balance for the user is required."]
  }
})

const Economy = mongoose.model("Economy", economySchema)
module.exports = Economy;