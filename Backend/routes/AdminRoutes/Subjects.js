const express = require('express');
const router = express.Router();
const Subject = require('../../models/Subject');

// Add subjects for a department and semester
router.post('/addSubjects', async (req, res) => {
  const { department, semester, subjects } = req.body;

  try {
    // Check if subjects for the department and semester already exist
    const existingSubjects = await Subject.findOne({ department, semester });
    if (existingSubjects) {
      return res.status(400).send('Subjects for this department and semester already exist');
    }

    // Create a new subject document
    const newSubject = new Subject({
      department,
      semester,
      subjects,
    });

    // Save the new subject document to the database
    await newSubject.save();

    res.status(201).send('Subjects added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding subjects');
  }
});

// Fetch subjects for a given department and semester
router.get('/getSubjects', async (req, res) => {
  const { department, semester } = req.query;

  try {
    const subjects = await Subject.findOne({ department, semester });
    if (!subjects) return res.status(404).send('Subjects not found');
    res.json(subjects.subjects);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching subjects');
  }
});

module.exports = router;
