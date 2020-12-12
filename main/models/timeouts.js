const mongoose = require('mongoose');

const timeoutsSchema = new mongoose.Schema({

    user: {             //ID of user
        type: String,
        required: [true, "A user ID is required."]
    },
    command: {          //String of command (must be a valid command in validCommands)
        type: String,
        required: [true, "A command type is required."],
    },
    expires: {          //Date for when the timeout expires
        type: Number,
        required: [true, "A timeout expiration date is required."]
    }

}, { timestamps: true });

const Timeouts = mongoose.model("Timeouts", timeoutsSchema);
module.exports = Timeouts;