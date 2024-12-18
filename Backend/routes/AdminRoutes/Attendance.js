const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');
const Student = require('../../models/Student'); 

//Route #1 to fetch students to be able to mark attendance
router.get('/filter-students', async (req, res) => {
  const { department, section, semester } = req.query;
  try {
    const students = await Student.find({ department, section, semester }).select('rollNumber name');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});

//Route #2 to mark attendance of students
router.post('/mark-attendance', async (req, res) => {
  const { department, section, semester, subjectCode, date, students } = req.body;

  try {
    // Convert the received date to an ISODate format (make sure it matches MongoDB's format)
    const parsedDate = new Date(date); // This will parse it to an ISODate

    // Check if attendance has already been marked for the same subject and date
    const existingAttendance = await Attendance.findOne({
      department,
      section,
      semester,
      subjectCode,
      date: {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),  // Start of the day
        $lt: new Date(parsedDate.setHours(23, 59, 59, 999)),  // End of the day
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance has already been marked for this subject on this date.' });
    }

    // If no existing attendance, save the new attendance record
    const attendance = new Attendance({
      department,
      section,
      semester,
      subjectCode,
      date: parsedDate,
      students,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });

  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: 'Error saving attendance', error });
  }
});



//Route #3 to fetch the attendance
router.get('/fetch-attendance', async (req, res) => {
  const { department, section, semester, subjectCode, startDate, endDate } = req.query;
  try {
    const query = {};

    if (department) query.department = department;
    if (section) query.section = section;
    if (semester) query.semester = semester;
    if (subjectCode) query.subjectCode = subjectCode;

    // If startDate and endDate are provided, include the full day of endDate
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Set the time for endDate to 23:59:59.999 to include the whole day
      end.setHours(23, 59, 59, 999);

      query.date = { $gte: start, $lte: end };
    }

    const attendanceRecords = await Attendance.find(query);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
});

//Route #4 to update the attendance
router.post('/update-attendance', async (req, res) => {
  const { rollNumber, subjectCode, date, status } = req.body;
  try {
    await Attendance.updateOne(
      { 'students.rollNumber': rollNumber, subjectCode, date },
      { $set: { 'students.$.status': status } }
    );
    res.status(200).send({ message: 'Attendance updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update attendance.' });
  }
});


module.exports = router;
