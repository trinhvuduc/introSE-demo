const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  week: Number,
  content: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  note: String,
  expertId: {
    type: Schema.Types.ObjectId,
    ref: 'experts'
  },
  clientsId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'clients'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('posts', PostSchema);
