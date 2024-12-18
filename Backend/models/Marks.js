const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  exam:{
    type: String,
    required: true,
  },
  marks: [
    {
      subjectCode: { type: String, required: true },
      subjectName: { type: String, required: true },
      mark: { type: Number, required: true },
    },
  ],
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
