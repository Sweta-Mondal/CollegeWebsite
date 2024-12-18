// models/Attendance.js

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  department: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  subjectCode: { type: String, required: true },
  date: { type: Date, required: true },
  students: [
    {
      rollNumber: { type: String, required: true },
      status: { type: String, enum: ['Present', 'Absent'], required: true }
    }
  ]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
