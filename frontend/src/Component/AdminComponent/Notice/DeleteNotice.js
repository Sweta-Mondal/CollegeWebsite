import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../StyleCSS/DeleteNotice.css';

const DeleteNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    section: '',
    semester: '',
    department: '',
  });
  const navigate = useNavigate();

  // Fetch notices with filters
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetchNotices', {
          params: filters,
        });
        setNotices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notices:', error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, [filters]); // Re-fetch when filters change

  const handleDelete = async (noticeId) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`http://localhost:5000/deleteNotice/${noticeId}`);
        alert('Notice deleted successfully');
        setNotices(notices.filter((notice) => notice._id !== noticeId));
      } catch (error) {
        console.error('Error deleting notice:', error);
        alert('Error deleting notice');
      }
    }
  };

  const handleUpdate = (notice) => {
    navigate('/update-notice', { state: { notice } });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="delete-notice-container">
      <Link to="/add-notice">
        <button className="add-notice">Add Notice</button>
      </Link>
      <h2>Notice Board</h2>

      <div className="filter-container">
        <label>Section:</label>
        <select name="section" value={filters.section} onChange={handleFilterChange}>
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>

        <label>Semester:</label>
        <select name="semester" value={filters.semester} onChange={handleFilterChange}>
          <option value="">All Semesters</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        <label>Department:</label>
        <select name="department" value={filters.department} onChange={handleFilterChange}>
          <option value="">All Departments</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Chemical Engineering</option>
        </select>
      </div>

      {loading ? (
        <p>Loading notices...</p>
      ) : notices.length === 0 ? (
        <p>No notices found</p>
      ) : (
        <ul className="notice-list">
          {notices.map((notice) => (
            <li key={notice._id} className="notice-item">
              <div className="notice-details">
                <h3>{notice.title}</h3>
                <p>{notice.content}</p>
                <p>Section: {notice.section}</p>
                <p>Semester: {notice.semester}</p>
                <p>Department: {notice.department}</p>
                <div className="button-container">
                  <button
                    onClick={() => handleUpdate(notice)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteNotice;
