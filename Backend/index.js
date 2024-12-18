const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const cron = require('node-cron');
const fetch = require('node-fetch');
const adminRoutes = require('./routes/AdminRoutes/AdminAuth');
const noticeRoutes = require('./routes/AdminRoutes/Notice');
const facultyRoutes = require('./routes/AdminRoutes/Faculty');
const studentRoutes = require('./routes/AdminRoutes/Student');
const Ebook = require('./routes/AdminRoutes/Ebook');
const courseRoutes = require('./routes/AdminRoutes/Course');
const GalleryImage = require('./routes/AdminRoutes/GalleryImage');
const StudentProfile = require('./routes/StudentRoutes/StudentProfile')
const StudentNotices = require('./routes/StudentRoutes/Notices')
const StudentEBooks = require('./routes/StudentRoutes/EBook')
const Marks = require('./routes/AdminRoutes/Marks')
const Subject = require('./routes/AdminRoutes/Subjects')
const Attendance = require('./routes/AdminRoutes/Attendance')
const StudentMarks = require('./routes/StudentRoutes/Mark')
const StudentAttendance = require('./routes/StudentRoutes/Attendance')
const StudentCourses = require('./routes/StudentRoutes/Courses')


const path = require('path');
const app = express()

connectToMongo();

app.use(cors())

app.use(express.json())

const port = 5000





app.use(adminRoutes); 
app.use(noticeRoutes);
app.use(facultyRoutes);
app.use(studentRoutes);
app.use(Ebook);
app.use(courseRoutes);
app.use(GalleryImage);
app.use(StudentProfile);
app.use(StudentNotices);
app.use(StudentEBooks);
app.use(Marks);
app.use(Subject);
app.use(StudentMarks);
app.use(Attendance);
app.use(StudentAttendance);
app.use(StudentCourses);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Cron job that runs every midnight to check course status
const checkCourseStatus = async () => {
  try {
      const response = await fetch('http://localhost:5000/check-course-status');
      const data = await response.json();
  } catch (error) {
      console.error('Error during scheduled course status check:', error);
  }
};

// Trigger the cron job immediately on server start
checkCourseStatus();

// You can also set the cron job to run periodically
cron.schedule('0 0 * * *', checkCourseStatus);

app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
});