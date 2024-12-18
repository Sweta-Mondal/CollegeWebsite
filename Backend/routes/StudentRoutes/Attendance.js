const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');

// Get Attendance for Logged-in Student
router.get('/studentAttendance', async (req, res) => {
    const { rollNumber, startDate, endDate, subjectCode } = req.query;
  
    try {
      const query = { 'students.rollNumber': rollNumber }; // Update to match nested rollNumber field
  
      if (startDate && endDate) {
        // Convert dates and make endDate inclusive by adding 1 day
        query.date = {
          $gte: new Date(startDate),
          $lt: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)),
        };
      }
  
      if (subjectCode) {
        query.subjectCode = subjectCode;
      }
  
      const attendanceRecords = await Attendance.find(query);
      res.json(attendanceRecords);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching attendance records' });
    }
  });
  

// Endpoint to fetch attendance summary
router.get('/attendanceSummary', async (req, res) => {
    const { rollNumber, startDate, endDate, subjectCode } = req.query;
  
    try {
      const query = { 'students.rollNumber': rollNumber }; // Match nested rollNumber field
  
      if (startDate && endDate) {
        // Convert dates and make endDate inclusive by adding 1 day
        query.date = {
          $gte: new Date(startDate),
          $lt: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)),
        };
      }
  
      if (subjectCode) {
        query.subjectCode = subjectCode;
      }
  
      const attendanceRecords = await Attendance.find(query);
      const totalClasses = attendanceRecords.length;
      const attendedClasses = attendanceRecords.filter(record =>
        record.students.some(student => student.rollNumber === rollNumber && student.status === 'Present')
      ).length;
  
      const attendancePercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
  
      res.json({
        totalClasses,
        attendedClasses,
        attendancePercentage,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching attendance summary' });
    }
  });
  
  

module.exports = router;
