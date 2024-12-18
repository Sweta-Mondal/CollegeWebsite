const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  examName: String,
  examDate: Date,
  subject: String,
  courseDetails: String,
  hallOrMode: String,
  maxMarks: Number,
  duration: String, 
  assignedFaculty: String,
});

module.exports = mongoose.model('Examination', examinationSchema);
