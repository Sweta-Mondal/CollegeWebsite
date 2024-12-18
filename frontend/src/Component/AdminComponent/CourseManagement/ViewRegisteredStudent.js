import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../../StyleCSS/RegisteredStudent.css';

const ViewRegisteredStudent = () => {
    const { id } = useParams();  // Get the course ID from the URL
    const [students, setStudents] = useState([]);  // State to hold the students data
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    useEffect(() => {
        const fetchRegisteredStudents = async () => {
            try {
                const response = await fetch(`http://localhost:5000/fetchRegisteredStudents/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setStudents(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching registered students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegisteredStudents();
    }, [id]);

    // Return loading state if still fetching data
    if (loading) return <p>Loading...</p>;

    // Return error state if there was an error fetching the data
    if (error) return <p>Error: {error}</p>;

    // Return message if no students are registered
    if (students.length === 0) return <p>No students are registered for this course.</p>;

    return (
        <div className="registered-students">
            <div className="students-list">
                <h3>Registered Students</h3>
                <ul>
                    {students.map(student => (
                        <li key={student._id} className="student-item">
                            <div><strong>Name:</strong> {student.name}</div>
                            <div><strong>Roll Number:</strong> {student.rollNumber}</div>
                            <div><strong>Department:</strong> {student.department}</div>
                            <div><strong>Semester:</strong> {student.semester}</div>
                            <div><strong>Section:</strong> {student.section}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewRegisteredStudent;
