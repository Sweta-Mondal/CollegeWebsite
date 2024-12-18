import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../StyleCSS/UpdateProfile.css';
import SideOptions from './SideOptions';
import Sidebar from './SideBar';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    rollNumber: '',
    yearOfStudy: '',
    semester: '',
    department: '',
    section: '',
    phone: '',
    address: '',
    nameOfGuardian: '',
    relationWithGuardian: '',
    phoneOfGuardian: '',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/getUser', {
        headers: { 'auth-token': token },
      });
      setStudent(response.data);
      setFormData(response.data);
    };

    fetchStudent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Error occurred");
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/updateUser', formData, {
        headers: { 'auth-token': token },
      });
      alert('Profile updated successfully!');
      navigate('/StudentDash');

    } catch (error) {
      console.error('Error updating profile', error);
      alert('Error updating profile');
    }
  };

  return (
    <>
      <SideOptions />
      <Sidebar />
      <div className="update-profile-container">
        <h1 className="update-profile-heading">Update Profile</h1>
        {student ? (
          <form onSubmit={handleSubmit} className="update-profile-form">
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="yearOfStudy">Year of Study</label>
                <input
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="section">Section</label>
                <input
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nameOfGuardian">Guardian Name</label>
                <input
                  id="nameOfGuardian"
                  name="nameOfGuardian"
                  value={formData.nameOfGuardian}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="relationWithGuardian">Guardian Relation</label>
                <input
                  id="relationWithGuardian"
                  name="relationWithGuardian"
                  value={formData.relationWithGuardian}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneOfGuardian">Guardian's Phone</label>
                <input
                  id="phoneOfGuardian"
                  name="phoneOfGuardian"
                  value={formData.phoneOfGuardian}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="update-profile-button">
                Update Profile
              </button>
            </div>
          </form>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </>
  );
};

export default UpdateProfile;
