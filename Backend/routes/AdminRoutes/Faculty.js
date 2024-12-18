const express = require('express');
const router = express.Router();
const Faculty = require('../../models/Faculty');

// Route to get all faculties
// Route to get all faculties with optional filters
router.get('/fetchFaculty', async (req, res) => {
  try {
    const { department, role } = req.query;
    const filter = {};

    if (department) {
      filter.department = { $regex: department, $options: 'i' }; // Case-insensitive match
    }
    if (role) {
      filter.role = { $regex: role, $options: 'i' }; // Case-insensitive match
    }

    const faculties = await Faculty.find(filter);
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to add a new faculty
router.post('/addFaculty', async (req, res) => {
  const { name, department, email, phone, courses, qualifications, role } = req.body;
  
  // Check if all fields are provided
  if (!name || !department || !email || !phone || !courses || !qualifications || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if a faculty with the same email already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: 'Faculty with this email already exists' });
    }

    // Create new faculty document
    const newFaculty = new Faculty({
      name,
      department,
      email,
      phone,
      courses,
      qualifications,
      role
    });

    // Save faculty to the database
    await newFaculty.save();
    res.status(201).json({ message: 'Faculty added successfully', faculty: newFaculty });
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ message: 'Error adding faculty' });
  }
});


// Route to update an existing faculty
router.put('/updateFaculty/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department, email, phone, courses, qualifications, role } = req.body;
  
  // Check if all fields are provided
  if (!name || !department || !email || !phone || !courses || !qualifications || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the faculty by ID
    const faculty = await Faculty.findById(id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // Update the faculty fields
    faculty.name = name;
    faculty.department = department;
    faculty.email = email;
    faculty.phone = phone;
    faculty.courses = courses;
    faculty.qualifications = qualifications;
    faculty.role = role;

    // Save updated faculty to the database
    await faculty.save();
    res.json({ message: 'Faculty updated successfully', faculty });
  } catch (error) {
    console.error('Error updating faculty:', error);
    res.status(500).json({ message: 'Error updating faculty' });
  }
});

//Route to get a specific faculty with id
router.get('/faculty/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faculty details' });
  }
});

// Route to delete a faculty
router.delete('/deleteFaculty/:id', async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findByIdAndDelete(facultyId);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
