const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    info: {
        id: {
            type: String,
            trim: true,
            required: true
        }, 
        name: {
            type: String,
            trim: true,
            required: true
        },
        owner_id: {
            type: String,
            trim: true,
            required: true
        },
        blacklisted: {
            type: Boolean,
            required: true
        }
    }, 
    gatekeeper: {
        welcome_enabled: {
            type: Boolean,
            required: true
        },
        welcome_channel: {
            type: String,
            required: true
        },
        welcome_message: {
            type: String,
            required: true
        },
        leave_enabled: {
            type: Boolean,
            required: true
        },
        leave_channel: {
            type: String,
            required: true
        },
        leave_message: {
            type: String,
            required: true
        }
    }, 
    userjoin: {
        enabled: {
            type: Boolean,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: true
        }
    },
    moderation: {
        staff_role: {
            type: String,
            required: true
        },
        link_block: {
            type: Boolean,
            required: true
        },
        filter: {
            type: [String],
            required: true
        }
    },
    logging: {
        enabled: {
            type: Boolean,
            required: true
        },
        channel: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        ignore: {
            type: [String],
            required: true
        }
    },
    tickets: {
        enabled: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
    }, {
        timestamps: true
})

const Guild = mongoose.model("Guild", guildSchema)
module.exports = Guild;