import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateCourse = () => {
    const location = useLocation();
    const course = location.state?.course;
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        courseName: '',
        description: '',
        courseCode: '',
        credits: '',
        duration: '',
        days: '',
        time: '',
        location: '',
        StartingFrom: '',
        LastDateToRegister: '',
        instructorId: '',
        syllabus: '',
        enrollmentLimit: '',
        semester: '',
        department: '',
    });

    // Fetch course data by ID
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fetchCourse/${course._id}`);
                setCourseData(response.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/updateCourse/${course._id}`, courseData);
            navigate('/course-management'); // Redirect after update
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Course</h2>
            <input type="text" name="courseName" value={courseData.courseName} placeholder="Course Name" onChange={handleChange} required />
            <textarea name="description" value={courseData.description} placeholder="Description" onChange={handleChange} required></textarea>
            <input type="text" name="courseCode" value={courseData.courseCode} placeholder="Course Code" onChange={handleChange} required />
            <input type="number" name="credits" value={courseData.credits} placeholder="Credits" onChange={handleChange} required />
            <input type="text" name="duration" value={courseData.duration} placeholder="Duration" onChange={handleChange} required />
            <input type="text" name="day" value={courseData.days} placeholder="Days" onChange={handleChange} required />
            <input type="text" name="time" value={courseData.time} placeholder="Time" onChange={handleChange} required />
            <input type="text" name="location" value={courseData.location} placeholder="Location" onChange={handleChange} required />
            <input type="text" name="StartingFrom" value={courseData.StartingFrom} placeholder="Starting From" onChange={handleChange} required />
            <input type="text" name="LastDateToRegister" value={courseData.LastDateToRegister} placeholder="Last Date To Register" onChange={handleChange} required />
            <input type="text" name="instructorId" value={courseData.instructorId} placeholder="Instructor ID" onChange={handleChange} required />
            <input type="text" name="syllabus" value={courseData.syllabus} placeholder="Syllabus" onChange={handleChange} required />
            <input type="number" name="enrollmentLimit" value={courseData.enrollmentLimit} placeholder="Enrollment Limit" onChange={handleChange} />
            <input type="text" name="semester" value={courseData.semester} placeholder="Semester" onChange={handleChange} required />
            <input type="text" name="department" value={courseData.department} placeholder="Department" onChange={handleChange} required />
            <button type="submit">Update Course</button>
        </form>
    );
};

export default UpdateCourse;
