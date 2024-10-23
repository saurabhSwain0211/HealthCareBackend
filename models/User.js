const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'provider'], default: 'patient' },
  age: { type: Number, default: 0 },
  allergies: { type: String, default: '' },
  medications: { type: String, default: '' },
});

module.exports = mongoose.model('User', UserSchema);
