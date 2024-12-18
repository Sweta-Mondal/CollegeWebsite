import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SideOptions from './SideOptions';
import Sidebar from './SideBar';
import '../../StyleCSS/StudentNotices.css';

const Notices = () => {
  const location = useLocation();
  const student = location.state; // Access the `student` data from Link state

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetchStudentNotices', {
          params: {
            department: String(student.department),
            section: String(student.section),
            semester: String(student.semester),
          },
        });
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [student]);

  if (loading) {
    return <p>Loading notices...</p>;
  }

  return (
    <>
    <SideOptions/>
    <Sidebar />
    <div className="notices-container">
      <h2>Notices</h2>
      {notices.length ? (
        notices.map((notice) => (
          <div key={notice._id} className="notice-card">
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
            <p><small>Department: {notice.department} | Section: {notice.section} | Semester: {notice.semester}</small></p>
            <p><small>Posted on: {new Date(notice.date).toLocaleDateString()}</small></p>
          </div>
        ))
      ) : (
        <p>No notices available for you at this time.</p>
      )}
    </div>
    </>
  );
};

export default Notices;
