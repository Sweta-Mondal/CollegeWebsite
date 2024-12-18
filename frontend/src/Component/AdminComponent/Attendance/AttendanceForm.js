import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import axios from 'axios';
import '../../../StyleCSS/AttendanceForm.css';

const AttendanceForm = () => {
  const [department, setDepartment] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [subjectCode, setSubjectCode] = useState('');
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState([]);

  const navigate = useNavigate(); // Initialize navigate for routing

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filter-students', {
        params: { department, section, semester },
      });
      setStudents(response.data);
      setAttendance(
        response.data.map(student => ({ rollNumber: student.rollNumber, status: 'Absent' }))
      );
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleStatusChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/mark-attendance', {
        department,
        section,
        semester,
        subjectCode,
        date,
        students: attendance,
      });
      alert('Attendance marked successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display the error message to the user
        alert(error.response.data.message); // This will show the "Attendance has already been marked" message
      } else {
        console.error('Error submitting attendance:', error);
      }
    }
  };

  return (
    <div className="attendance-container">
      <div className="button-container">
          <button
            onClick={() => navigate('/attendance-list')}
            className="secondary-button"
          >
            Fetch Attendance
          </button>
        </div>
      <h1 className="form-title">Mark Attendance</h1>
      <div className="form-section">
        <label>Department:</label>
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="form-select"
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Chemical Engineering</option>
        </select>

        <label>Section:</label>
        <select
          value={section}
          onChange={e => setSection(e.target.value)}
          className="form-select"
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>

        <label>Semester:</label>
        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
          className="form-select"
        >
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        <button onClick={fetchStudents} className="primary-button">
          Fetch Students
        </button>
      </div>

      {students.length > 0 && (
        <div className="attendance-table-section">
          <h2>Mark Attendance</h2>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-input"
          />
          <label>Subject Code:</label>
          <input
            type="text"
            value={subjectCode}
            onChange={e => setSubjectCode(e.target.value)}
            className="form-input"
          />

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.rollNumber}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>
                    <select
                      value={attendance[index]?.status || 'Absent'}
                      onChange={e => handleStatusChange(index, e.target.value)}
                      className="form-select"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleSubmit} className="primary-button">
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceForm;
