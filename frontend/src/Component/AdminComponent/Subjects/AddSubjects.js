import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../StyleCSS/AddSubjects.css';

const AddSubjects = () => {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleAddSubject = () => {
    const newSubject = { subjectCode, subjectName };
    setSubjects([...subjects, newSubject]);
    setSubjectCode('');
    setSubjectName('');
  };

  const handleSubmit = async () => {
    if (!department || !semester || subjects.length === 0) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/addSubjects', {
        department,
        semester,
        subjects,
      });
      setMessage('Subjects added successfully');
      setSubjects([]);
    } catch (err) {
      setMessage('Error adding subjects');
    }
  };

  return (
    <div className="add-subjects-container">
      <h2 className="add-subjects-header">Add Subjects</h2>

      <button
        className="add-subjects-get-button"
        onClick={() => navigate('/fetch-subjects')}
      >
        Get Subjects
      </button>

      <div className="add-subjects-form">
        <label>Department:</label>
        <select onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <label>Semester:</label>
        <select onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <label>Subject Code:</label>
        <input
          type="text"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
        />

        <label>Subject Name:</label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />

        <button className="add-subjects-button" onClick={handleAddSubject}>
          Add Subject
        </button>
      </div>

      <div>
        <h3>Subjects</h3>
        <ul className="add-subjects-list">
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject.subjectCode} - {subject.subjectName}
            </li>
          ))}
        </ul>
      </div>

      <button className="add-subjects-button" onClick={handleSubmit}>
        Submit Subjects
      </button>

      {message && <p className="add-subjects-message">{message}</p>}
    </div>
  );
};

export default AddSubjects;
