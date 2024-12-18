import React from 'react';
import Sidebar from './SideBar';
import '../../StyleCSS/StudentDash.css'
import StudentProfile from './StudentProfile';
import SideOptions from './SideOptions';

const StudentDash = () => {
  return (
    <div className="dashboard">
      <SideOptions />
      <Sidebar />
      <StudentProfile />
    </div>
  );
};

export default StudentDash;

