import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  discordID: {
    type: String,
    required: [true, 'A Discord ID is required.']
  },
  token: {
    type: String,
    // required: [true, 'An authorization token is required.']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    serverId: {
      type: String,
      required: true
    },
    imageDeleteURL: {
      type: String,
      required: true
    }
  }],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;