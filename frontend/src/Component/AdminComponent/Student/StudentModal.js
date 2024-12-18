import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../StyleCSS/StudentModal.css';

const StudentModal = ({ show, onClose, student, onStudentUpdated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setsection] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [nameOfGuardian, setNameOfGuardian] = useState('');
  const [phoneOfGuardian, setPhoneOfGuardian] = useState('');
  const [relationWithGuardian, setRelationWithGuardian] = useState('');

  useEffect(() => {
    if (student) {
      // Populate fields with student data
      setName(student.name || '');
      setEmail(student.email || '');
      setPassword(student.password ); // Always empty for security
      setDepartment(student.department || '');
      setPhone(student.phone || '');
      setRollNumber(student.rollNumber || '');
      setYearOfStudy(student.yearOfStudy || '');
      setSemester(student.semester || '');
      setsection(student.section || '');
      setDateOfBirth(student.dateOfBirth || '');
      setAddress(student.address || '');
      setNameOfGuardian(student.nameOfGuardian || '');
      setPhoneOfGuardian(student.phoneOfGuardian || '');
      setRelationWithGuardian(student.relationWithGuardian || '');
    } else{
      // Reset fields when modal is closed
      setName('');
      setEmail('Email@');
      setPassword('');
      setDepartment('');
      setPhone('');
      setRollNumber('');
      setYearOfStudy('');
      setSemester('');
      setsection('');
      setDateOfBirth('');
      setAddress('');
      setNameOfGuardian('');
      setPhoneOfGuardian('');
      setRelationWithGuardian('');
    }
  }, [student]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      name,
      email,
      password: password || undefined,
      department,
      phone,
      rollNumber,
      yearOfStudy,
      semester,
      section,
      dateOfBirth,
      address,
      nameOfGuardian,
      phoneOfGuardian,
      relationWithGuardian,
    };
  
    try {
      if (student) {
        await axios.put(`http://localhost:5000/updateStudent/${student._id}`, studentData);
      } else {
        await axios.post('http://localhost:5000/addStudent', studentData);
      }
      onStudentUpdated(); // Refresh student list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding/updating student:', error);
      alert('Error while saving student data. Please try again.');
    }
  };
  
  

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>{student ? 'Update Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input type="number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Roll Number" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
          <input type="text" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} placeholder="Year of Study" required />
          <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Semester" required />
          <input type="text" value={section} onChange={(e) => setsection(e.target.value)} placeholder="Section" required />
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
          <input type="text" value={nameOfGuardian} onChange={(e) => setNameOfGuardian(e.target.value)} placeholder="Name of Guardian" required />
          <input type="text" value={phoneOfGuardian} onChange={(e) => setPhoneOfGuardian(e.target.value)} placeholder="Phone of Guardian" required />
          <input type="text" value={relationWithGuardian} onChange={(e) => setRelationWithGuardian(e.target.value)} placeholder="Relation with Guardian" required />

          <div className="modal-actions">
            <button type="submit" className="submit-btn">{student ? 'Update Student' : 'Add Student'}</button>
            <button type="button" className="close-modal-btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
