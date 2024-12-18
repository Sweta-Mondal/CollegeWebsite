const express = require('express');
const Student = require('../../models/Student');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../../middleware/fetchuser');


const JWT_SECRET = "#Swetaisagoodgirl@";


// ROUTE #1: loging in a user with credentials created by admin
router.post('/Userlogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ studentId: student._id }, JWT_SECRET);
        res.json({ token, student });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// ROUTE #2: Fetching user info 
router.get('/getUser', fetchuser, async (req, res) => {
    try {
        const student = await Student.findById(req.studentId).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


//Update the user information
router.put('/updateUser', fetchuser, async (req, res) => {
    const updates = req.body;
    try {
      const student = await Student.findByIdAndUpdate(req.studentId, updates, {
        new: true, // return the updated document
        runValidators: true // validate before update
      });
      res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
  });
  
module.exports = router;