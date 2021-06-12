const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpertSchema = new Schema({
  name: String,
  age: String,
  phoneNumber: String,
  username: String,
  clientsId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'clients'
    }
  ]
});

module.exports = mongoose.model('experts', ExpertSchema);
