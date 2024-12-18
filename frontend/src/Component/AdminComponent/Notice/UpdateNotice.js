import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../StyleCSS/UpdateNotice.css';

const UpdateNotice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notice = location.state?.notice; // Use optional chaining to safely access notice

  // Initialize state based on the notice or provide default values
  const [title, setTitle] = useState(notice ? notice.title : '');
  const [content, setContent] = useState(notice ? notice.content : '');

  // Handle case where notice is null
  if (!notice) {
    return <p>No notice found for update.</p>; // Show a message if notice is null
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateNotice/${notice._id}`, {
        title,
        content,
      });
      alert('Notice updated successfully');
      navigate('/notice-board');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Error updating notice');
    }
  };

  return (
    <div className="update-notice-container">
      <h2>Update Notice</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Notice</button>
      </form>
    </div>
  );
};

export default UpdateNotice;
