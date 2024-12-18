const express = require('express');
const multer = require('multer');
const Course = require('../../models/Course');
const CourseRegistration = require('../../models/CourseRegistration');
const path = require('path');
const router = express.Router();
const moment = require('moment');


// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder where you want to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage: storage });

// Add a new course
router.post('/addCourse', upload.single('syllabus'), async (req, res) => {
    console.log(req.body); 
    try {
        // Include the path of the uploaded syllabus file in the course data
        const courseData = {
            ...req.body,
            syllabus: req.file.path // Store the file path
        };

        const course = new Course(courseData);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update course details
router.put('/updateCourse/:id', async (req, res) => {
    console.log('Update request received for ID:', req.params.id, 'with data:', req.body);

    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a course
router.delete('/deleteCourse/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all courses
router.get('/fetchCourses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch a single course with its ID
router.get('/fetchCourse/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/fetchRegisteredStudents/:id', async (req, res) => {
    try {
        // Find all course registrations where courseId matches the provided course ID
        const registrations = await CourseRegistration.find({ courseId: req.params.id })
            .populate('courseId', 'courseName');  // Populate course details (e.g., courseName)

        // If no registrations are found for the course ID
        if (!registrations.length) {
            return res.status(404).json({ message: 'No students found for this course' });
        }

        // Return the list of registrations (students)
        res.json(registrations);
    } catch (error) {
        console.error('Error fetching registered students:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Route to check the course registration deadline, i.e whether the course is awctive or not
router.get('/check-course-status', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch all courses from the database
        const currentDate = moment(); // Current date

        // Iterate over each course to check the registration deadline
        for (let course of courses) {
            // Parse the LastDateToRegister from the course using moment()
            const registrationDeadline = moment(course.LastDateToRegister, "DD/MM/YYYY");

            // If the registration deadline has passed and the course is still active, update it
            if (registrationDeadline.isBefore(currentDate) && course.isActive) {
                course.isActive = false; // Set the course status to inactive
                await course.save(); // Save the updated course
            }
        }

        res.status(200).json({ message: 'Course status check complete' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
