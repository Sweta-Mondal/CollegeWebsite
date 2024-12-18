const express = require('express');
const router = express.Router();
const Marks = require('../../models/Marks');

// Fetch marks by rollNumber, semester, and exam type
router.get('/getStudentMarks', async (req, res) => {
  const { rollNumber, semester, exam } = req.query;

  try {
    let query = { rollNumber, semester };
    if (exam !== 'all') {
      query.exam = exam; // Filter by exam type if not 'all'
    }

    const studentMarks = await Marks.find(query);
    if (!studentMarks || studentMarks.length === 0) {
      return res.status(404).json({ message: 'Marks not found for the given criteria' });
    }

    // Group marks by exam type
    const groupedMarks = studentMarks.reduce((acc, record) => {
      if (!acc[record.exam]) {
        acc[record.exam] = [];
      }
      acc[record.exam].push(...record.marks);
      return acc;
    }, {});

    res.json(groupedMarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
