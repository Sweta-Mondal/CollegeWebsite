const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      subjectCode: { type: String, required: true },
      subjectName: { type: String, required: true },
    },
  ],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
