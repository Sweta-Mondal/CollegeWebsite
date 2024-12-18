import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCourse = () => {
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
        syllabus: null, // Changed to null for file upload
        enrollmentLimit: '',
        semester: '',
        department: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setCourseData(prevData => ({ ...prevData, [name]: e.target.files[0] })); // Handle file input
        } else {
            setCourseData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        for (const key in courseData) {
            formData.append(key, courseData[key]);
        }
    
        try {
            await axios.post('http://localhost:5000/addCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/course-management');
        } catch (error) {
            console.error('Error adding course:', error.response?.data || error.message); // Improved logging
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Course</h2>
            <input type="text" name="courseName" placeholder="Course Name" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
            <input type="text" name="courseCode" placeholder="Course Code" onChange={handleChange} required />
            <input type="text" name="credits" placeholder="Credits" onChange={handleChange} required />
            <input type="text" name="duration" placeholder="Duration" onChange={handleChange} required />
            <input type="text" name="days" placeholder="Days" onChange={handleChange} required />
            <input type="text" name="time" placeholder="Time" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="text" name="StartingFrom" placeholder="Starting From" onChange={handleChange} required />
            <input type="text" name="LastDateToRegister" placeholder="Last Date To Register" onChange={handleChange} required />
            <input type="text" name="instructorId" placeholder="Instructor ID" onChange={handleChange} required />            
            <input type="text" name="enrollmentLimit" placeholder="Enrollment Limit" onChange={handleChange} />
            <input type="text" name="semester" placeholder="Semester" onChange={handleChange} required />
            <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
            <label htmlFor="syllabus" style={{ display: 'block', margin: '10px 0' }}>
                Upload Syllabus
                <input 
                    type="file" 
                    name="syllabus" 
                    id="syllabus" 
                    accept=".pdf, .jpg, .jpeg, .png" 
                    onChange={handleChange} 
                    required 
                    style={{ display: 'block', marginTop: '5px' }} 
                />
            </label>
            <button type="submit">Add Course</button>
        </form>
    );
};

export default AddCourse;
