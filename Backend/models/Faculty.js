const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  department: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  phone: {
    type: String,
    required: true
  },
  courses: {
    type: String, // Array of course names or course IDs
    required: true
  },
  hireDate: {
    type: Date,
    default: Date.now // When the faculty was added to the system
  },
  qualifications: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Faculty', FacultySchema);
