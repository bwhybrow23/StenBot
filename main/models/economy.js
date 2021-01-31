const mongoose = require("mongoose");

const economySchema = new mongoose.Schema({

  discordID: {
    type: String,
    required: [true, "A Discord ID is required."],
    trim: true
  },
  balance: {
    type: Number,
    required: [true, "A balance for the user is required."]
  }
  
})

const Economy = mongoose.model("Economy", economySchema)
module.exports = Economy;