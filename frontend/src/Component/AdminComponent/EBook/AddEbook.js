import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../StyleCSS/AddEbook.css';

const AddEbook = () => {
  const [ebookTitle, setEbookTitle] = useState('');
  const [statement, setStatement] = useState('');
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [section, setSection] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('ebookTitle', ebookTitle);
    formData.append('statement', statement);
    formData.append('file', file);
    formData.append('semester', semester);
    formData.append('department', department);
    formData.append('section', section);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("eBook added successfully");
      navigate('/Ebook'); 
    } catch (error) {
      console.error('Error uploading ebook:', error);
      setMessage('Failed to upload ebook.');
    }
  };

  return (
    <div className="add-ebook">
      <h2>Add New eBook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>eBook Title:</label>
          <input
            type="text"
            value={ebookTitle}
            onChange={(e) => setEbookTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Statement:</label>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div>
          <label>Semester:</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
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
        </div>

        <div>
          <label>Department:</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Chemical Engineering</option>
          </select>
        </div>

        <div>
          <label>Section:</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        
        <div>
          <label>Upload File (PDF, JPG, PNG):</label>
          <input type="file" onChange={handleFileChange} accept=".pdf, .jpg, .png" required />
        </div>

        <button type="submit">Upload eBook</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddEbook;
