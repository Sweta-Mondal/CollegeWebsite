import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SideOptions from '../SideOptions';
import Sidebar from '../SideBar';
import '../../../StyleCSS/CourseDetails.css';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getStudentCourseDetail/${courseId}`);
                setCourse(response.data);
            } catch (err) {
                setError('Error fetching course details');
                console.error(err);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <SideOptions />
            <Sidebar />
            <div className="course-details">
                <h2>{course.courseName}</h2>
                <p>{course.description}</p>
                <table className="course-details-table">
                    <tbody>
                        <tr>
                            <th>Course Code:</th>
                            <td>{course.courseCode}</td>
                        </tr>
                        <tr>
                            <th>Instructor:</th>
                            <td>{course.instructorId.name}</td>
                        </tr>
                        <tr>
                            <th>Credits:</th>
                            <td>{course.credits}</td>
                        </tr>
                        <tr>
                            <th>Duration:</th>
                            <td>{course.duration}</td>
                        </tr>
                        <tr>
                            <th>Location:</th>
                            <td>{course.location}</td>
                        </tr>
                        <tr>
                            <th>Days:</th>
                            <td>{course.days}</td>
                        </tr>
                        <tr>
                            <th>Time:</th>
                            <td>{course.time}</td>
                        </tr>
                        <tr>
                            <th>Starting From:</th>
                            <td>{course.StartingFrom}</td>
                        </tr>
                        <tr>
                            <th>Last Date to Register:</th>
                            <td>{course.LastDateToRegister}</td>
                        </tr>
                        <tr>
                            <th>Syllabus:</th>
                            <td>
                                <a href={`http://localhost:5000/${course.syllabus}`} target="_blank" rel="noopener noreferrer">
                                    View Syllabus
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Enrollment Limit:</th>
                            <td>{course.enrollmentLimit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CourseDetail;
