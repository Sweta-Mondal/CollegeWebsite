import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseId } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        section: '',
        semester: '',
        department: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/registerCourse', { ...formData, courseId });
            if (response.data.message === 'You are already registered for this course.') {
                setError(response.data.message);  // Show the message to the user
                return;  // Stop further execution
            }
            alert('Registration Successful');
            navigate('/student-courses', { state: { semester: formData.semester, department: formData.department } });
        } catch (err) {
            setError('Registration failed. Try again.');
            console.error(err);
        }
    };

    return (
        <div className="registration-form">
            <h2>Register for Course</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required />
                <input name="section" placeholder="Section" value={formData.section} onChange={handleChange} required />
                <input name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} required />
                <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
