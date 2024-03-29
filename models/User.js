const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  cc1: {
    type: String,
    required: false
  },
  cc2: {
    type: String,
    required: false
  },
  cc3: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;