import React, { useState } from 'react';
import axios from 'axios';
import '../../../StyleCSS/AttendanceList.css';

const AttendanceList = () => {
  const [filters, setFilters] = useState({
    department: '',
    section: '',
    semester: '',
    subjectCode: '',
    startDate: '',
    endDate: '',
  });
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState({
    visible: false,
    rollNumber: '',
    subjectCode: '',
    date: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/fetch-attendance', { params: filters });
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (rollNumber, subjectCode, date, status) => {
    setUpdateModal({
      visible: true,
      rollNumber,
      subjectCode,
      date,
      status,
    });
  };

  const closeUpdateModal = () => {
    setUpdateModal({ visible: false, rollNumber: '', subjectCode: '', date: '', status: '' });
  };

  const handleStatusChange = (e) => {
    setUpdateModal({ ...updateModal, status: e.target.value });
  };

  const updateAttendance = async () => {
    const { rollNumber, subjectCode, date, status } = updateModal;
    if (status.toLowerCase() !== 'present' && status.toLowerCase() !== 'absent') {
      alert('Invalid status. Please enter "Present" or "Absent".');
      return;
    }

    try {
      await axios.post('http://localhost:5000/update-attendance', {
        rollNumber,
        subjectCode,
        date,
        status,
      });
      alert('Attendance updated successfully!');
      closeUpdateModal();
      fetchAttendance(); // Refresh the list
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance. Try again later.');
    }
  };

  return (
    <div className="attendance-list-container">
      <h1 className="attendance-list-title">Fetch Attendance</h1>
      <div className="filters-container">
        {/* Filter Inputs */}
        <label>Department:</label>
        <select
          className="filter-select"
          name="department"
          value={filters.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Chemical Engineering</option>
        </select>
        <label>Section:</label>
        <select
          className="filter-select"
          name="section"
          value={filters.section}
          onChange={handleChange}
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
          className="filter-select"
          name="semester"
          value={filters.semester}
          onChange={handleChange}
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
        <label>Subject Code:</label>
        <input
          className="filter-input"
          type="text"
          name="subjectCode"
          value={filters.subjectCode}
          onChange={handleChange}
          placeholder="Subject Code"
        />
        <label>Start Date:</label>
        <input
          className="filter-input"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
        <label>End Date:</label>
        <input
          className="filter-input"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
        <button
          className="fetch-button"
          onClick={fetchAttendance}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Attendance'}
        </button>
      </div>
      {attendanceData.length > 0 ? (
        <div className="attendance-table-container">
          <h2>Attendance Records</h2>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Subject Code</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) =>
                record.students.map((student) => (
                  <tr key={`${record.date}-${student.rollNumber}`}>
                    <td>{student.rollNumber}</td>
                    <td>{record.subjectCode}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{student.status}</td>
                    <td>
                      <button
                        className="update-button"
                        onClick={() =>
                          openUpdateModal(student.rollNumber, record.subjectCode, record.date, student.status)
                        }
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-records-message">No attendance records found.</p>
      )}

      {/* Update Modal */}
      {updateModal.visible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Attendance</h3>
            <p>Roll Number: {updateModal.rollNumber}</p>
            <p>Subject Code: {updateModal.subjectCode}</p>
            <p>Date: {new Date(updateModal.date).toLocaleDateString()}</p>
            <label>Status:</label>
            <select value={updateModal.status} onChange={handleStatusChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <div className="modal-buttons">
              <button onClick={updateAttendance} className="save-button">Save</button>
              <button onClick={closeUpdateModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
