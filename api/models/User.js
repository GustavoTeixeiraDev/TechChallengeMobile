const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['professor', 'student'], required: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: function () {
      return this.role === 'professor' ? 'Professor' : 'Student';
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
