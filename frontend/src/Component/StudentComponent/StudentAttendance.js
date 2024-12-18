import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './SideBar';
import SideOptions from './SideOptions';
import '../../StyleCSS/StudentAttendance.css';

const StudentAttendance = () => {
  const location = useLocation();
  const student = location.state;
  const { rollNumber } = student;
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    subjectCode: '', // Adding subjectCode filter
  });
  const [summary, setSummary] = useState({
    totalClasses: 0,
    attendedClasses: 0,
    attendancePercentage: 0,
  });

  // Fetch Attendance and Summary
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      // Convert startDate and endDate to the correct format if they are set
      const formattedStartDate = filter.startDate ? new Date(filter.startDate).toISOString() : '';
      const formattedEndDate = filter.endDate ? new Date(filter.endDate).toISOString() : '';

      // Fetch attendance records with subjectCode filter
      const response = await axios.get('http://localhost:5000/studentAttendance', {
        params: {
          rollNumber: student.rollNumber,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          subjectCode: filter.subjectCode,
        },
      });
      setAttendance(response.data);

      // Fetch attendance summary with subjectCode filter
      const summaryResponse = await axios.get('http://localhost:5000/attendanceSummary', {
        params: {
          rollNumber: student.rollNumber,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          subjectCode: filter.subjectCode,
        },
      });
      setSummary(summaryResponse.data);
    } catch (err) {
      setError('Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };


  const handleDateChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAttendance();
  };

  return (
    <>
      <Sidebar />
      <SideOptions />
      <div className="attendance-report">
        <h2 className="attendance-heading">Your Attendance Report</h2>

        {error && <p className="error-message">{error}</p>}

        {loading && <p className="loading-message">Loading...</p>}

        {/* Display Attendance Summary */}
        <div className="attendance-summary">
          <p><strong>Total Classes:</strong> {summary.totalClasses}</p>
          <p><strong>Attended Classes:</strong> {summary.attendedClasses}</p>
          <p><strong>Attendance Percentage:</strong> {summary.attendancePercentage}%</p>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleFilterSubmit} className="filter-form">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleDateChange}
            className="date-input"
          />

          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleDateChange}
            className="date-input"
          />

          <label htmlFor="subjectCode" className="form-label">Subject Code:</label>
          <input
            id="subjectCode"
            type="text"
            name="subjectCode"
            value={filter.subjectCode}
            onChange={handleDateChange}  // Reusing the same handler
            className="date-input"
          />

          <button type="submit" className="filter-button">Filter</button>
        </form>

        {/* Attendance Table */}
        {attendance.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject Code</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => {
                // Find the logged-in student's attendance status
                const loggedInStudent = record.students.find(
                  (student) => student.rollNumber === rollNumber
                );

                return (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.subjectCode}</td>
                    <td>{loggedInStudent?.status || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !loading && <p className="no-records">No attendance records found.</p>
        )}

      </div>
    </>
  );
};

export default StudentAttendance;
