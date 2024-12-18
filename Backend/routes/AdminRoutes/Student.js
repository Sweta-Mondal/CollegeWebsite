const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');
const bcrypt = require('bcrypt');


// Route to get all students with optional filtering
router.get('/fetchStudent', async (req, res) => {
  try {
    const { section, branch, semester } = req.query; // Get filter parameters from query
    const filter = {};
    if (section) filter.section = section;
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;

    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to add a new student
router.post('/addStudent', async (req, res) => {

  const { name, email, password, phone, rollNumber, department, yearOfStudy, semester, section, dateOfBirth, address, nameOfGuardian,  phoneOfGuardian, relationWithGuardian} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if all fields are provided
  if (!name || !email || !password || !phone || !rollNumber || !department || !yearOfStudy || !semester|| !section || !dateOfBirth || !address || !nameOfGuardian || !phoneOfGuardian || !relationWithGuardian) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if a faculty with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Create new student document
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      rollNumber,
      department,
      yearOfStudy,
      semester,
      section,
      dateOfBirth,
      address,
      nameOfGuardian,
      phoneOfGuardian,
      relationWithGuardian
    });

    // Save student to the database
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', Student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student' });
  }
});


// Route to update an existing student
router.put('/updateStudent/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, rollNumber, department, yearOfStudy, semester, section, dateOfBirth, address, nameOfGuardian,  phoneOfGuardian, relationWithGuardian} = req.body;
  
  // Check if all fields are provided
  if (!name || !email || !password || !phone || !rollNumber || !department || !yearOfStudy || !semester|| !section || !dateOfBirth || !address || !nameOfGuardian || !phoneOfGuardian || !relationWithGuardian) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the student by ID
    const students = await Student.findById(id);
    if (!students) return res.status(404).json({ message: 'Student not found' });
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the student fields
    students.name = name;
    students.email = email;
    students.password = hashedPassword;
    students.phone = phone;
    students.rollNumber = rollNumber;
    students.department = department;
    students.yearOfStudy = yearOfStudy;
    students.semester = semester;
    students.section = section;
    students.dateOfBirth = dateOfBirth;
    students.address = address;
    students.nameOfGuardian = nameOfGuardian;
    students.phoneOfGuardian = phoneOfGuardian;
    students.relationWithGuardian = relationWithGuardian;
    // Save updated student to the database
    await students.save();
    res.json({ message: 'Student updated successfully', students });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
});


router.get('/student/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.findById(id);
    if (!students) return res.status(404).json({ message: 'Student not found' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student details' });
  }
});

router.delete('/deleteStudent/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
