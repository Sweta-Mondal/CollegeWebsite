const express = require('express');
const router = express.Router();
const Notice = require('../../models/Notice');

// Route#1 to fetch notices for students based on their department, section, and semester
router.get('/fetchStudentNotices', async (req, res) => {
  const { section, semester, department } = req.query;

  try {
    const notices = await Notice.find({
      $or: [
        { section, semester, department },                     // Exact match for student
        { section: 'All', semester, department },              // Notices for the entire semester and department
        { section, semester: 'All', department },              // Notices for the entire section and department
        { section, semester, department: 'All' },              // Notices for the entire department
        { section: 'All', semester: 'All', department },       // Notices for all sections in the department
        { section: 'All', semester, department: 'All' },       // Notices for all semesters in the department
        { section: 'All', semester: 'All', department: 'All' } // Notices for the entire college
      ]
    });

    res.status(200).json(notices);
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

module.exports = router;
