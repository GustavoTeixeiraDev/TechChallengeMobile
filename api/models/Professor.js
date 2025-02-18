const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  title: { type: String },
});

module.exports = mongoose.model('Professor', ProfessorSchema);