const express = require('express');
const Course = require('../../models/Course');
const CourseRegistration = require('../../models/CourseRegistration');


const router = express.Router();

// Fetch courses based on semester, department, or 'ALL'
router.get('/getStudentCourse', async (req, res) => {
    const { semester, department } = req.query;

    try {
        let query = { isActive: true };  // Filter for active courses

        // If semester is provided, add it to the query
        if (semester && semester !== 'ALL') {
            query.semester = semester;
        }

        // If department is provided, add it to the query
        if (department && department !== 'ALL') {
            query.department = department;
        }

        // Fetch courses based on the query conditions
        const courses = await Course.find(query).populate('instructorId', 'name');

        if (!courses.length) {
            return res.status(404).json({ message: 'No active courses found for your semester/department.' });
        }

        return res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
});



router.post('/registerCourse', async (req, res) => {
    const { name, rollNumber, courseId, section, semester, department } = req.body;

    try {
        // Check if the student is already registered for this course
        const existingRegistration = await CourseRegistration.findOne({ rollNumber, courseId });

        if (existingRegistration) {
            return res.status(200).json({ message: 'You are already registered for this course.' });
        }

        // Create a new registration
        const newRegistration = new CourseRegistration({
            name,
            rollNumber,
            courseId,
            section,
            semester,
            department,
        });

        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.get('/getStudentCourseDetail/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructorId');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching course details' });
    }
});

module.exports = router;
