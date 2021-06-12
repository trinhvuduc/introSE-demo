const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
  },
  password: {
    type: String,
    required: [true, "can't be blank"]
  },
  role: {
    type: String,
    enum: ['client', 'expert', 'trainer', 'admin'],
    default: 'client'
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'clients'
  },
  expertId: {
    type: Schema.Types.ObjectId,
    ref: 'experts'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);
