const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, required: true },
  enrollmentYear: { type: Number },
});

module.exports = mongoose.model('Student', StudentSchema);