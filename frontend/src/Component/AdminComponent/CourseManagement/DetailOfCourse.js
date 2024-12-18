import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../StyleCSS/DetailOfCourse.css';

const DetailOfCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/fetchCourse/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const currentDate = new Date();
                const lastDateToRegister = new Date(data.LastDateToRegister);
                if (currentDate > lastDateToRegister) {
                    data.isActive = false;
                }

                setCourse(data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]); // Dependency on ID to refetch if it changes

    const fetchRegisteredStudents = ()=>{
        navigate(`/registered-student/${id}`);
    } 

    if (loading) return <p>Loading...</p>;
    if (!course) return <p>Course not found. Please go back to the courses list.</p>;

    return (
        <div className="course-details">
            <h2>{course.courseName}</h2>
            <p>{course.description}</p>
            <table className="course-details-table">
                <tbody>
                    <tr><th>Course Code:</th><td>{course.courseCode}</td></tr>
                    <tr><th>Credits:</th><td>{course.credits}</td></tr>
                    <tr><th>Duration:</th><td>{course.duration}</td></tr>
                    <tr><th>Days:</th><td>{course.days}</td></tr>
                    <tr><th>Time:</th><td>{course.time}</td></tr>
                    <tr><th>Location:</th><td>{course.location}</td></tr>
                    <tr><th>Starting From:</th><td>{course.StartingFrom}</td></tr>
                    <tr><th>Last Date To Register:</th><td>{course.LastDateToRegister}</td></tr>
                    <tr><th>Enrollment Limit:</th><td>{course.enrollmentLimit}</td></tr>
                    <tr><th>Semester:</th><td>{course.semester}</td></tr>
                    <tr><th>Department:</th><td>{course.department}</td></tr>
                    <tr><th>Active:</th><td>{course.isActive ? 'Yes' : 'No'}</td></tr>
                    <tr><th>Created At:</th><td>{new Date(course.createdAt).toLocaleString()}</td></tr>
                    <tr><th>Updated At:</th><td>{new Date(course.updatedAt).toLocaleString()}</td></tr>
                    <tr>
                        <th>Syllabus:</th>
                        <td>
                            {course.syllabus ? (
                                <a href={`http://localhost:5000/${course.syllabus}`} target="_blank" rel="noopener noreferrer">
                                    View Syllabus
                                </a>
                            ) : 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <th>View Registered Students:</th>
                        <td>
                            <button onClick={fetchRegisteredStudents}>View Students</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetailOfCourse;
