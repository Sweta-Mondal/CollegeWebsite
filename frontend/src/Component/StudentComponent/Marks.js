import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SideOptions from './SideOptions';
import Sidebar from './SideBar';
import '../../StyleCSS/Marks.css';

const Marks = () => {
  const location = useLocation();
  const { rollNumber } = location.state || {};
  const [semester, setSemester] = useState('');
  const [exam, setExam] = useState('all'); // Default to 'all' for all exams
  const [marks, setMarks] = useState({});
  const [error, setError] = useState('');

  const handleFetchMarks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getStudentMarks', {
        params: { rollNumber, semester, exam },
      });
      setMarks(response.data);
      setError('');
    } catch (err) {
      setMarks({});
      setError(err.response?.data?.message || 'Error fetching marks');
    }
  };

  return (
    <>
      <SideOptions />
      <Sidebar />
      <div className="marks-container">
        <h2 className="marks-title">View Marks</h2>
        <div className="marks-form">
          <label htmlFor="semester" className="marks-label">
            Select Semester:
          </label>
          <select
            id="semester"
            className="marks-select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">--Select Semester--</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>

          <label htmlFor="exam" className="marks-label">
            Exam Type:
          </label>
          <select
            id="exam"
            className="marks-select"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            <option value="all">All Exams</option>
            <option value="CA1">CA1</option>
            <option value="CA2">CA2</option>
            <option value="CA3">CA3</option>
            <option value="CA4">CA4</option>
            <option value="PCA1">PCA1</option>
            <option value="PCA2">PCA2</option>
            <option value="Final">Final</option>
          </select>

          <button
            className="marks-button"
            onClick={handleFetchMarks}
            disabled={!semester || !exam}
          >
            Fetch Marks
          </button>
        </div>
        {error && <p className="marks-error">{error}</p>}
        {Object.keys(marks).length > 0 &&
          Object.entries(marks).map(([examType, examMarks]) => (
            <div key={examType} className="marks-table-container">
              <h3 className="marks-subtitle">{examType} Exam</h3>
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {examMarks.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.subjectCode}</td>
                      <td>{subject.subjectName}</td>
                      <td>{subject.mark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </>
  );
};

export default Marks;
