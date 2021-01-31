const mongoose = require("mongoose");

const userBlacklistSchema = new mongoose.Schema({

  user_id: {
    type: String,
    trim: true,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  blacklisted: {
    type: Boolean,
    required: true
  }
  
}, {
  timestamps: true
});

const UserBlacklist = mongoose.model("UserBlacklist", userBlacklistSchema)
module.exports = UserBlacklist;