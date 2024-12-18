import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../StyleCSS/Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterSemester, setFilterSemester] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/fetchCourses');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        const confirmation = window.confirm("Are you sure you want to delete the course?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:5000/deleteCourse/${courseId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setCourses(courses.filter(course => course._id !== courseId));
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    // Filter courses based on selected criteria
    const filteredCourses = courses.filter(course => {
        const matchesName = course.courseName.toLowerCase().includes(filterName.toLowerCase());
        const matchesDepartment = filterDepartment ? course.department === filterDepartment : true;
        const matchesStatus = filterStatus ? (filterStatus === 'Active' ? course.isActive : !course.isActive) : true;
        const matchesSemester = filterSemester ? course.semester === filterSemester : true;

        return matchesName && matchesDepartment && matchesStatus && matchesSemester;
    });

    return (
        <div className="courses-container">
            <Link to="/add-course">
                <button className="add-course-button">Add New Course</button>
            </Link>

            {/* Filtering Options */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search by course name..."
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="filter-input"
                />

                <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="filter-dropdown"
                >
                    <option value="">Select department</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Chemical Engineering</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-dropdown"
                >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <select
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                    className="filter-dropdown"
                >
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
            </div>

            {/* Course List */}
            <div className="course-list">
                {filteredCourses.map(course => (
                    <div className="course-card" key={course._id}>
                        <h3>{course.courseName}</h3>
                        <p>{course.description.slice(0, 100)}...</p>
                        <div className="course-actions">
                            <Link to={`/course-details/${course._id}`}>
                                <button className="course-details-button">View Details</button>
                            </Link>
                            <button className="course-delete-button" onClick={() => handleDelete(course._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
