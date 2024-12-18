import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacultyModal from './FacultyModal.js';
import '../../../StyleCSS/UpdateFaculty.css';

const UpdateFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    role: '',
    qualifications: '',
  });

  // Fetch all faculties
  const fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchFaculty');
      setFaculties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching faculties:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  // Fetch details of a single faculty
  const handleDetailClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/faculty/${id}`);
      setFacultyDetails(response.data);
    } catch (error) {
      console.error('Error fetching faculty details:', error);
    }
  };

  const handleAddNewFaculty = () => {
    setSelectedFaculty(null); // For adding new faculty
    setShowModal(true);
  };

  const handleUpdateFaculty = (faculty) => {
    setSelectedFaculty(faculty); // For updating faculty
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFacultyDetails(null); // Close modal and reset faculty details
  };

  const DeleteFaculty = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this faculty?")) {
        await axios.delete(`http://localhost:5000/deleteFaculty/${id}`);
        setFaculties((prevFaculties) => prevFaculties.filter(faculty => faculty._id !== id));
      }
    } catch (error) {
      console.error('Error deleting faculty details:', error);
    }
  };

  // Callback to refresh faculties
  const refreshFaculties = () => {
    fetchFaculties();
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter faculties based on criteria
  const filteredFaculties = faculties.filter(faculty => {
    return (
      (filters.department === '' || faculty.department.toLowerCase().includes(filters.department.toLowerCase())) &&
      (filters.role === '' || faculty.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (filters.qualifications === '' || faculty.qualifications.toLowerCase().includes(filters.qualifications.toLowerCase()))
    );
  });

  return (
    <div className="update-faculty-container">
      <div className="header">
        <h2 className="facultytext">Manage Faculties</h2>
        <button className="add-faculty-btn" onClick={handleAddNewFaculty}>
          Add Faculty
        </button>
      </div>

      <div className="filter-section">
        <input
          type="text"
          name="department"
          placeholder="Filter by Department"
          value={filters.department}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Filter by Role"
          value={filters.role}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="qualifications"
          placeholder="Filter by Qualifications"
          value={filters.qualifications}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <p>Loading faculties...</p>
      ) : filteredFaculties.length === 0 ? (
        <p>No Faculty matches the filter criteria.</p>
      ) : (
        <ul className="faculty-list">
          {filteredFaculties.map((faculty) => (
            <li key={faculty._id} className="faculty-item">
              <div className="button-container">
                <button onClick={() => DeleteFaculty(faculty._id)} className="delete-faculty-button">
                  🗑️
                </button>
              </div>
              <div className="faculty-details">
                <h3>{faculty.name}</h3>
                <p>{faculty.department}</p>
                <p>{faculty.email}</p>
                <button onClick={() => handleDetailClick(faculty._id)} className="detail-btn">
                  Detail
                </button>
                {facultyDetails && facultyDetails._id === faculty._id && (
                  <div className="faculty-full-details">
                    <p>Name: {facultyDetails.name}</p>
                    <p>Department: {facultyDetails.department}</p>
                    <p>Email: {facultyDetails.email}</p>
                    <p>Phone: {facultyDetails.phone}</p>
                    <p>Courses: {facultyDetails.courses}</p>
                    <p>Hire Date: {new Date(facultyDetails.hireDate).toLocaleDateString()}</p>
                    <p>Qualifications: {facultyDetails.qualifications}</p>
                    <p>Role: {facultyDetails.role}</p>
                    <button onClick={() => handleUpdateFaculty(facultyDetails)} className="update-btn">
                      Update
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <FacultyModal
          show={showModal}
          onClose={handleCloseModal}
          faculty={selectedFaculty}
          refreshFaculties={refreshFaculties} // Pass the callback function
        />
      )}
    </div>
  );
};

export default UpdateFaculty;
