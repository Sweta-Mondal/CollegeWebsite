import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../../StyleCSS/SideBar.css';

const Sidebar = ({ isOpen }) => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Retrieve student data from localStorage on app load
    const storedStudent = localStorage.getItem('student');
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm("Do you want to logout");
    if(!confirmLogout){
      return;
    }else{
      localStorage.removeItem('token');
      sessionStorage.clear(); 
      navigate('/userlogin', { replace: true });
    }
};

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <p className='side-logout' onClick={logout}>Logout</p>
        </li>
        <li>
          <Link to="/StudentDash">Profile</Link>
        </li>
        <li>
          <Link to="/update-student-profile">Update Profile</Link>
        </li>
        <li>
          <Link to="/student-attendance" state={ student }>Attendance</Link>
        </li>
        <li>
          <Link to="/student-marks" state={{ rollNumber: student?.rollNumber }}>Marks</Link>
        </li>
        <li>
          <Link to="/student-notices" state={ student }>Notices</Link>
        </li>
        <li>
          <Link to="/student-ebooks" state={ student }>eBooks</Link>
        </li>
        <li>
          <Link to="/student-courses" state={{ semester: student?.semester, department: student?.department }}>Courses</Link>
        </li>
        <li>
          <Link to="/student-gallery">Gallery Image</Link>
        </li>
        
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
