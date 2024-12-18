import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../../StyleCSS/FetchStudents.css';

const FetchStudent = () => {
    const [semester, setSemester] = useState('');
    const [department, setDepartment] = useState('');
    const [section, setSection] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();

    const fetchStudents = async () => {
        if (!semester || !department || !section) {
            setError('Please select all fields before fetching students.');
            return;
        }
        setLoading(true);
        setError('');
        setSelectedStudent(null);
        try {
            const response = await axios.get('http://localhost:5000/getStudents', {
                params: { semester, department, section },
            });
            setStudents(response.data);
        } catch (err) {
            setError('Error fetching students. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentDetails = async (rollNumber) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/getStudentDetails', {
                params: { rollNumber },
            });
            setSelectedStudent(response.data);
        } catch (err) {
            setError('Error fetching student details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleMarksHistory = (rollNumber) => {
        // Navigate to the marks history page for the selected student
        navigate(`/marks-history/${rollNumber}`);
    };

    return (
        <div className="fetch-student-container">
            <h2 className="heading">Marks Management</h2>
            {/* Filter Section for Semester, Department, Section */}
            <div className="filter-section">
                <label>Semester:</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)} className="dropdown">
                    <option value="">Select Semester</option>
                    {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <label>Department:</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="dropdown">
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Chemical Engineering</option>
                </select>
            </div>
            <div className="filter-section">
                <label>Section:</label>
                <select value={section} onChange={(e) => setSection(e.target.value)} className="dropdown">
                    <option value="">Select Section</option>
                    {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                        <option key={sec} value={sec}>{sec}</option>
                    ))}
                </select>
            </div>
            <button onClick={fetchStudents} disabled={loading} className="fetch-button">
                {loading ? 'Fetching...' : 'Fetch Students'}
            </button>

            {error && <p className="error-message">{error}</p>}

            <div className="students-list">
                {students.length > 0 ? (
                    <ul>
                        {students.map((student) => (
                            <li key={student.rollNumber} className="student-item">
                                {student.name} ({student.rollNumber}) - {student.email}
                                <button onClick={() => fetchStudentDetails(student.rollNumber)} className="details-button">Details</button>
                                <button onClick={() => navigate(`/allot-marks/${student.rollNumber}`)} className="allot-marks-button">Allot Marks</button>
                                <button onClick={() => handleMarksHistory(student.rollNumber)} className="marks-history-button">Marks History</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No students found.</p>
                )}
            </div>

            {selectedStudent && (
                <div className="student-details">
                    <h3>Student Details</h3>
                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                    <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                    <p><strong>Address:</strong> {selectedStudent.address}</p>
                    <p><strong>Date of Birth:</strong> {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Year of Study:</strong> {selectedStudent.yearOfStudy}</p>
                    <p><strong>Semester:</strong> {selectedStudent.semester}</p>
                    <p><strong>Section:</strong> {selectedStudent.section}</p>
                    <p><strong>Department:</strong> {selectedStudent.department}</p>
                    <p><strong>Guardian Name:</strong> {selectedStudent.nameOfGuardian}</p>
                    <p><strong>Guardian Phone:</strong> {selectedStudent.phoneOfGuardian}</p>
                    <p><strong>Relation with Guardian:</strong> {selectedStudent.relationWithGuardian}</p>
                    <button onClick={() => setSelectedStudent(null)} className="close-button">Close</button>
                </div>
            )}
        </div>
    );
};

export default FetchStudent;
