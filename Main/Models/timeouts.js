import mongoose from 'mongoose';

const timeoutsSchema = new mongoose.Schema({

  user: { //ID of user
    type: String,
    required: [true, 'A user ID is required.']
  },
  command: { //String of command (must be a valid command in validCommands)
    type: String,
    required: [true, 'A command type is required.'],
  },
  expires: { //Date for when the timeout expires
    type: Number,
    required: [true, 'A timeout expiration date is required.']
  },
  reoccuring: {
    type: Boolean,
    required: [true, 'Specification on if this is reoccuring or not is required.']
  },
  reoccuringPeriod: {
    type: Number
  },
  message: {
    type: String
  }

}, {
  timestamps: true
});

const Timeouts = mongoose.model('Timeouts', timeoutsSchema);

export default Timeouts;