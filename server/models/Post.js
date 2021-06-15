const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  week: String,
  content: String,
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
  ]
});

module.exports = mongoose.model('posts', PostSchema);
