const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guild_id: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  guild_name: {
    type: String,
    trim: true,
    required: true
  },
  guild_owner_id: {
    type: String,
    trim: true,
    required: true
  },
  blacklisted: {
    type: Boolean,
    required: true
  },
  welcomer_enabled: {
    type: Boolean,
    required: true
  },
  welcomer_channel: {
    type: String,
  },
  welcomer_message: {
    type: String,
  },
  leave_enabled: {
    type: Boolean,
    required: true
  },
  leave_channel: {
    type: String,
  },
  leave_message: {
    type: String,
  },
  userjoin_enabled: {
    type: Boolean,
    required: true
  },
  userjoin_role: {
    type: String,
  },
  userjoin_nickname: {
    type: String,
  },
  staff_role: {
    type: String,
  },
  staff_admin: {
    type: Boolean,
    required: true
  },
  staff_linkblock: {
    type: Boolean,
    required: true
  },
  staff_filter: {
    type: [String],
  },
  staff_autoban: {
    type: String,
  },
  logging_enabled: {
    type: Boolean,
    required: true
  },
  logging_channel: {
    type: String,
  },
  logging_level: {
    type: String,
    required: true,
    validate(level) {
      if (level != "low" && level != "medium" && level != "high") {
        throw new Error("Invalid logging level")
      }
    }
  },
  logging_ignore: {
    type: [String],
  },
  tickets_enabled: {
    type: Boolean,
    required: true
  },
  tickets_message: {
    type: String,
  },
  music_enabled: {
    type: Boolean,
    required: true
  },
  selfrole_list: {
    type: [String],
  },
  levelling_enabled: {
    type: Boolean,
    required: true
  }

}, {
  timestamps: true
});


// const OldGuild = mongoose.model("OldGuild", guildSchema)
// module.exports = OldGuild;