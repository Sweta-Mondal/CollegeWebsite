import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../../StyleCSS/AdminDash.css';
import AddNotice from '../../Component/AdminComponent/Notice/AddNotice';
import DeleteNotice from '../../Component/AdminComponent/Notice/DeleteNotice';
import UpdateFaculty from '../../Component/AdminComponent/Faculty/UpdateFaculty';
import UpdateStudent from '../../Component/AdminComponent/Student/UpdateStudent';
import AddEbook from '../../Component/AdminComponent/EBook/AddEbook';
import EbookList from '../../Component/AdminComponent/EBook/EbookList';
import Courses from '../../Component/AdminComponent/CourseManagement/Courses';
import UpdateCourse from '../../Component/AdminComponent/CourseManagement/UpdateCourse';
import DetailOfCourse from '../../Component/AdminComponent/CourseManagement/DetailOfCourse';
import AddGalleryImage from '../../Component/AdminComponent/GalleryImage/AddGalleryImage';
import GalleryDisplay from '../../Component/AdminComponent/GalleryImage/GalleryDisplay';
import FetchStudent from '../../Component/AdminComponent/Marks/FetchStudent';
import AddSubjects from '../../Component/AdminComponent/Subjects/AddSubjects';
import AttendanceForm from '../../Component/AdminComponent/Attendance/AttendanceForm';

const AdminDash = () =>  {
  return (
    <div className="dashboard">
      <h1 className="adminText">Admin Dashboard</h1>
      <nav>
        <div className="button-row">
          <Link to="/faculty-management" className="button">
            Faculty Management
          </Link>
          <Link to="/student-management" className="button">
            Student Management
          </Link>
        </div>
        <div className="button-row">
          <Link to="/notice-board" className="button">
            Notice Board
          </Link>
          <Link to="/Ebook" className="button">
            eBooks
          </Link>
        </div>
        <div className="button-row">
          <Link to="/course-management" className="button">
            Course Management
          </Link>
          <Link to="/subject-management" className="button">
            Subject Management
          </Link>
          
        </div>
        <div className="button-row">
          <Link to="/attendance-management" className="button">
            Attendance
          </Link>
          <Link to="/Marks-management" className="button">
            Marks
          </Link>
        </div>
        <div className="button-row">
          <Link to="/gallery-display" className="button">
            Add Gallery Image
          </Link>
          <Link to="/Exams-Assessments" className="button">
            Examination and Assessment
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/add-notice" element={<AddNotice />} />
        <Route path="/delete-notice" element={<DeleteNotice />} />
        <Route path="/faculty-management" element={<UpdateFaculty />} />
        <Route path="/student-management" element={<UpdateStudent />} />
        <Route path="/Ebook" element={<EbookList />} />
        <Route path="/add-ebook" element={<AddEbook />} />
        <Route path="/course-management" element={<Courses />} />
        <Route path="/update-course" element={<UpdateCourse />} />
        <Route path="/course-details/:id" element={<DetailOfCourse />} />
        <Route path="/gallery-display" element={<GalleryDisplay />} />
        <Route path="/add-gallery-image" element={<AddGalleryImage />} />
        <Route path="/Marks-management" element={<FetchStudent />} />
        <Route path="/attendance-management" element={<AttendanceForm />} />
        <Route path="/subject-management" element={<AddSubjects />} />
      </Routes>
    </div>
  );
};

export default AdminDash;

