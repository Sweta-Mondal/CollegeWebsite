import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../StyleCSS/FacultyModal.css';

const FacultyModal = ({ show, onClose, faculty, refreshFaculties }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courses, setCourses] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (faculty) {
      setName(faculty.name);
      setDepartment(faculty.department);
      setEmail(faculty.email);
      setPhone(faculty.phone);
      setCourses(faculty.courses);
      setQualifications(faculty.qualifications);
      setRole(faculty.role);
    } else {
      setName('');
      setDepartment('');
      setEmail('');
      setPhone('');
      setCourses('');
      setQualifications('');
      setRole('');
    }
  }, [faculty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyData = { name, department, email, phone, courses, qualifications, role };

    try {
      if (faculty) {
        // Update faculty
        await axios.put(`http://localhost:5000/updateFaculty/${faculty._id}`, facultyData);
        alert('Faculty updated successfully');
      } else {
        // Add new faculty
        await axios.post('http://localhost:5000/addFaculty', facultyData);
        alert('Faculty added successfully');
      }
      onClose(); // Close modal
      refreshFaculties(); // Refresh faculty list in parent component
    } catch (error) {
      console.error('Error saving faculty:', error);
      alert('Error saving faculty');
    }
  };

  return show ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='modaltext'>{faculty ? 'Update Faculty' : 'Add Faculty'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Department:
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Phone:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label>
            Courses:
            <input type="text" value={courses} onChange={(e) => setCourses(e.target.value)} required />
          </label>
          <label>
            Qualifications:
            <input type="text" value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
          </label>
          <label>
            Role:
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
          </label>
          <div className="button-group"> 
            <button type="submit" className="submit-btn">{faculty ? 'Update' : 'Add'} Faculty</button>
            <button type="button" className="close-modal-btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;  
};

export default FacultyModal;
