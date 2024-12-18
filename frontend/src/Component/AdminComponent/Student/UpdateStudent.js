import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentModal from './StudentModal.js';
import '../../../StyleCSS/UpdateStudent.css'; 

const UpdateStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  
  // Filter states
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");

  // Fetch students function
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/fetchStudent', {
        params: { section, department, semester },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Call fetchStudents when filters change
  useEffect(() => {
    fetchStudents();
  }, [section, department, semester]);
  
  useEffect(() => {
    fetchStudents(); // Call fetchStudents when component mounts
  }, []);

  // Filter students based on selected values
  useEffect(() => {
    const filtered = students.filter(student => {
      return (
        (semester === "" || student.semester === semester) &&
        (department === "" || student.department === department) &&
        (section === "" || student.section === section)
      );
    });
    setFilteredStudents(filtered);
  }, [semester, department, section, students]);

  const handleDetailClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/student/${id}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleAddNewStudent = () => {
    setSelectedStudent(null);
    setShowModal(true);
  };

  const handleUpdateStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    setStudentDetails(null);
    await fetchStudents(); // Refresh the student list after closing the modal
  };

  const deleteStudent = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this student?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/deleteStudent/${id}`);
      setStudents((prevStudents) => prevStudents.filter(student => student._id !== id));
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student details:', error);
      alert('Failed to delete student. Please try again.');
    }
  };

  return (
    <div className="update-student-container">
      <h2>Manage Students</h2>
      <button className="add-student-btn" onClick={handleAddNewStudent}>
        Add Student
      </button>

      {/* Dropdowns for filtering */}
      <div className="filter-container">
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
        
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Chemical Engineering</option>
        </select>
        
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <ul className="student-list">
          {filteredStudents.map((student) => (
            <li key={student._id} className="student-item">
              <div className="button-container">
                <button className="delete-button" onClick={() => deleteStudent(student._id)}>Delete</button>
              </div>
              <div className="student-details">
                <h3>{student.name}</h3>
                <p>{student.department}</p>
                <p>{student.email}</p>
              </div>
              <button onClick={() => handleDetailClick(student._id)} className="detail-btn">
                Detail
              </button>
              {studentDetails && studentDetails._id === student._id && (
                <div className="student-full-details">
                  <p>Name: {studentDetails.name}</p>
                  <p>Email: {studentDetails.email}</p>
                  <p>Department: {studentDetails.department}</p>
                  <p>Phone: {studentDetails.phone}</p>
                  <p>Roll Number: {studentDetails.rollNumber}</p>
                  <p>Year of Study: {studentDetails.yearOfStudy}</p>
                  <p>Semester: {studentDetails.semester}</p>
                  <p>Section: {studentDetails.section}</p>
                  <p>Date of Birth: {studentDetails.dateOfBirth}</p>
                  <p>Address: {studentDetails.address}</p>
                  <p>Name of Guardian: {studentDetails.nameOfGuardian}</p>
                  <p>Phone of Guardian: {studentDetails.phoneOfGuardian}</p>
                  <p>Relation with Guardian: {studentDetails.relationWithGuardian}</p>
                  <button onClick={() => handleUpdateStudent(studentDetails)} className="update-btn">
                    Update
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <StudentModal
          show={showModal}
          onClose={handleCloseModal}
          student={selectedStudent}
          onStudentUpdated={fetchStudents} // Pass the fetch function to the modal
        />
      )}
    </div>
  );
};

export default UpdateStudent;
