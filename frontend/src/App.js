import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './Component/Authentication/loginpage'
import UserLogin from './Component/Authentication/login/Userlogin'
import AdminLogin from './Component/Authentication/login/Adminlogin'
import UserSignup from './Component/Authentication/Signin/UserSignup'
import AdminSignup from './Component/Authentication/Signin/AdminSignup'
import StudentDash from './Component/StudentComponent/StudentDash';
import AdminDash from './Component/AdminComponent/AdminDash';
import AddNotice from './Component/AdminComponent/Notice/AddNotice';
import DeleteNotice from './Component/AdminComponent/Notice/DeleteNotice';
import UpdateFaculty from './Component/AdminComponent/Faculty/UpdateFaculty';
import UpdateStudent from './Component/AdminComponent/Student/UpdateStudent';
import UpdateNotice from './Component/AdminComponent/Notice/UpdateNotice';
import AddEbook from './Component/AdminComponent/EBook/AddEbook';
import EbookList from './Component/AdminComponent/EBook/EbookList';
import Courses from './Component/AdminComponent/CourseManagement/Courses';
import AddCourse from './Component/AdminComponent/CourseManagement/AddCourse';
import UpdateCourse from './Component/AdminComponent/CourseManagement/UpdateCourse';
import DetailOfCourse from './Component/AdminComponent/CourseManagement/DetailOfCourse';
import GalleryDisplay from './Component/AdminComponent/GalleryImage/GalleryDisplay';
import AddGalleryImage from './Component/AdminComponent/GalleryImage/AddGalleryImage';
import StudentProfile from './Component/StudentComponent/StudentProfile';
import UpdateProfile from './Component/StudentComponent/UpdateProfile';
import Notices from './Component/StudentComponent/Notices';
import EBooks from './Component/StudentComponent/EBooks';
import FetchStudent from './Component/AdminComponent/Marks/FetchStudent';
import AddSubjects from './Component/AdminComponent/Subjects/AddSubjects';
import FetchSubjects from './Component/AdminComponent/Subjects/FetchSubjects';
import AllotMarks from './Component/AdminComponent/Marks/AllotMarks';
import MarksHistory from './Component/AdminComponent/Marks/MarksHistory';
import Marks from './Component/StudentComponent/Marks';
import AttendanceForm from './Component/AdminComponent/Attendance/AttendanceForm';
import AttendanceList from './Component/AdminComponent/Attendance/AttendanceList';
import StudentAttendance from './Component/StudentComponent/StudentAttendance';
import GalleryImage from './Component/StudentComponent/GalleryImage';
import CourseList from './Component/StudentComponent/Course/CourseList';
import RegistrationForm from './Component/StudentComponent/Course/RegistrationForm';
import CourseDetail from './Component/StudentComponent/Course/CourseDetail';
import ViewRegisteredStudent from './Component/AdminComponent/CourseManagement/ViewRegisteredStudent';


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/userlogin', { replace: true });
    }
  }, [navigate]);

  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Adminlogin" element={<AdminLogin/>} />
        <Route path="/Userlogin" element={<UserLogin/>} />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/AdminSignup" element={<AdminSignup />} />
        <Route path="/StudentDash" element={<StudentDash />} />
        <Route path="/AdminDash" element={<AdminDash />} />
        <Route path="/notice-board" element={<DeleteNotice />} />
        <Route path="/add-notice" element={<AddNotice />} />
        <Route path="/update-notice" element={<UpdateNotice />} />
        <Route path="/faculty-management" element={<UpdateFaculty />} />
        <Route path="/student-management" element={<UpdateStudent />} />
        <Route path="/Ebook" element={<EbookList />} />
        <Route path="/add-ebook" element={<AddEbook />} />
        <Route path="/course-management" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/update-course" element={<UpdateCourse />} />
        <Route path="/course-details/:id" element={<DetailOfCourse />} />
        <Route path ="/registered-student/:id" element={<ViewRegisteredStudent/>} />
        <Route path="/gallery-display" element={<GalleryDisplay />} />
        <Route path="/add-gallery-image" element={<AddGalleryImage />} />
        <Route path="/StudentDash" element={<StudentProfile />} />
        <Route path="/update-student-profile" element={<UpdateProfile />} />
        <Route path="/student-notices" element={<Notices />} />
        <Route path="/student-ebooks" element={<EBooks />} />
        <Route path="/Marks-management" element={<FetchStudent />} />
        <Route path="/subject-management" element={<AddSubjects />} />
        <Route path="/fetch-subjects" element={<FetchSubjects />} />
        <Route path="/allot-marks/:rollNumber" element={<AllotMarks />} />
        <Route path="/marks-history/:rollNumber" element={<MarksHistory />} />
        <Route path="/student-marks" element={<Marks />} />
        <Route path="/attendance-management" element={<AttendanceForm />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/student-gallery" element={<GalleryImage />} />
        <Route path ="/student-courses" element={<CourseList/>} />
        <Route path ="/registered-students" element={<RegistrationForm/>} />
        <Route path ="/student-course-details/:courseId" element={<CourseDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
