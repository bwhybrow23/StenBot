const mongoose = require("mongoose");

const punishmentSchema = new mongoose.Schema({
  guildId: {
    type: String,
    trim: true,
    required: true
  },
  bans: {
    type: [Object],
  },
  kicks: {
    type: [Object],
  },
  mutes: {
    type: [Object],
  },
  tempmutes: {
    type: [Object],
  },
  warns: {
    type: [Object],
  }
}, {
  timestamps: true
})

const Punishment = mongoose.model("Punishment", punishmentSchema);
module.exports = Punishment;