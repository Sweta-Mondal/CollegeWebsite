const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');
const Marks = require('../../models/Marks')
const Subject = require('../../models/Subject');

// Endpoint to fetch students based on filters
router.get('/getStudents', async (req, res) => {
  const { semester, department, section } = req.query;
  try {
    const students = await Student.find(
      { semester, department, section },
      'name rollNumber email'
    );
    res.json(students);
  } catch (err) {
    res.status(500).send('Error fetching students');
  }
});

// Endpoint to fetch a specific student's details
router.get('/getStudentDetails', async (req, res) => {
  const { rollNumber } = req.query;
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send('Error fetching student details');
  }
});

router.get('/getSubjectsForMarks', async (req, res) => {
  try {
    const { rollNumber } = req.query;

    // Fetch student details
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Fetch subjects based on department and semester
    const subjects = await Subject.findOne({
      department: student.department,
      semester: student.semester,
    });

    res.json({
      rollNumber: student.rollNumber,
      semester: student.semester,
      department: student.department,
      subjects: subjects || [],
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/allotMarks', async (req, res) => {
  const { rollNumber, semester, department, exam, marks } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const existingRecord = await Marks.findOne({ rollNumber, semester, department, exam });

    if (existingRecord) {
      // Update marks for the specified exam
      existingRecord.marks = marks;
      await existingRecord.save();
      res.status(200).json({ message: 'Marks updated successfully.' });
    } else {
      // Create a new record if none exists for the specified exam
      const newMarks = new Marks({ rollNumber, semester, department, exam, marks });
      await newMarks.save();
      res.status(201).json({ message: 'Marks allotted successfully.' });
    }
  } catch (error) {
    console.error('Error saving marks:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


router.get('/getMarksHistory', async (req, res) => {
  const { rollNumber, exam } = req.query; // Include exam as an optional filter

  try {
    const query = { rollNumber };
    if (exam) query.exam = exam; // Filter by exam type if provided

    const marksHistory = await Marks.find(query);
    if (!marksHistory || marksHistory.length === 0) {
      return res.status(404).json({ error: 'No marks history found for this student' });
    }
    res.status(200).json(marksHistory);
  } catch (err) {
    console.error('Error fetching marks history:', err);
    res.status(500).send('Error fetching marks history');
  }
});



module.exports = router;
