const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"]
  },
  username: String,
  dob: String,
  phoneNumber: String
});

module.exports = mongoose.model('clients', ClientSchema);
