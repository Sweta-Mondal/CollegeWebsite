import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SideOptions from '../SideOptions';
import Sidebar from '../SideBar';
import '../../../StyleCSS/CourseList.css';

const CourseList = () => {
    const location = useLocation();
    const { semester, department } = location.state || {};
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    const handleRegister = (courseId) => {
        navigate('/registered-students', { state: { courseId } });
    };

    const handleViewDetail = (courseId) => {
        navigate(`/student-course-details/${courseId}`);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getStudentCourse', {
                    params: {
                        semester: semester,
                        department: department,
                    },
                });
                setCourses(response.data);
            } catch (err) {
                setError('Error fetching courses');
                console.error(err);
            }
        };

        fetchCourses();
    }, [semester, department]);

    return (
        <>
            <SideOptions />
            <Sidebar />
            <div className='heading-container'>
                <h3 className='course-heading'>Courses</h3>
            </div>
            <div className="course-list-container">
                {error && <p className="error-message">{error}</p>}
                <div>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course._id} className="course-item">
                                <h3>{course.courseName}</h3>
                                <p>{course.description}</p>
                                <p className="instructor"><strong>Instructor:</strong> {course.instructorId.name}</p>
                                <p className="credits"><strong>Credits:</strong> {course.credits}</p>
                                <div className="course-buttons">
                                    <button onClick={() => handleRegister(course._id)}>Register</button>
                                    <button onClick={() => handleViewDetail(course._id)}>View Details</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-courses-message">No courses available for your selected semester/department.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CourseList;
