import React, { useState } from 'react';
import axios from 'axios';
import '../../../StyleCSS/FetchSubjects.css';

const FetchSubjects = () => {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [fetchedSubjects, setFetchedSubjects] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetchSubjects = async () => {
    if (!department || !semester) {
      setMessage('Please select department and semester first.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/getSubjects', {
        params: { department, semester },
      });
      setFetchedSubjects(response.data);
      setMessage('');
    } catch (err) {
      setMessage('Error fetching subjects');
    }
  };

  return (
    <div className="fetch-subjects-container">
      <h2 className="fetch-subjects-header">Fetch Subjects</h2>

      <div className="fetch-subjects-form">
        <label>Department:</label>
        <select
          className="fetch-subjects-select"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <label>Semester:</label>
        <select
          className="fetch-subjects-select"
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <button className="fetch-subjects-button" onClick={handleFetchSubjects}>
          Fetch Subjects
        </button>
      </div>

      <div>
        <h3 className="fetch-subjects-subheader">Subjects</h3>
        <ul className="fetch-subjects-list">
          {fetchedSubjects.length > 0 ? (
            fetchedSubjects.map((subject, index) => (
              <li key={index}>
                {subject.subjectCode} - {subject.subjectName}
              </li>
            ))
          ) : (
            <p>No subjects found.</p>
          )}
        </ul>
      </div>

      {message && <p className="fetch-subjects-message">{message}</p>}
    </div>
  );
};

export default FetchSubjects;
