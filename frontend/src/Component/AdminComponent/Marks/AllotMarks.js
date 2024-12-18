import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../StyleCSS/AllotMarks.css';

const AllotMarks = () => {
    const { rollNumber } = useParams();
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [marks, setMarks] = useState({});
    const [studentDetails, setStudentDetails] = useState({});
    const [exam, setExam] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/getSubjectsForMarks', {
                    params: { rollNumber },
                });
                setSubjects(response.data.subjects.subjects);
                setStudentDetails({
                    rollNumber: response.data.rollNumber,
                    semester: response.data.semester,
                    department: response.data.department,
                });
            } catch (err) {
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [rollNumber]);

    const handleMarkChange = (subjectCode, value) => {
        setMarks({ ...marks, [subjectCode]: value });
    };

    const handleSubmit = async () => {
        try {
            if (!exam) {
                setError('Please select an exam type before submitting.');
                return;
            }

            const allMarksProvided = subjects.every(
                (subject) => marks[subject.subjectCode] !== undefined && marks[subject.subjectCode] !== ''
            );

            if (!allMarksProvided) {
                setError('Please enter marks for all subjects before submitting.');
                return;
            }

            setLoading(true);
            const formattedMarks = Object.keys(marks).map(subjectCode => ({
                subjectCode,
                subjectName: subjects.find(subject => subject.subjectCode === subjectCode).subjectName,
                mark: marks[subjectCode],
            }));

            await axios.post('http://localhost:5000/allotMarks', {
                rollNumber: studentDetails.rollNumber,
                semester: studentDetails.semester,
                department: studentDetails.department,
                exam, 
                marks: formattedMarks,
            });

            alert('Marks allotted successfully!');
            navigate('/Marks-management');
        } catch (err) {
            console.error('Error details:', err.response ? err.response.data : err.message);
            setError('Error saving marks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="allot-marks-container">
            <h2 className="title">Allot Marks for Roll Number: {rollNumber}</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Loading...</p>}
            {!loading && subjects.length > 0 && (
                <div className="subjects-container">
                    <select
                        value={exam}
                        onChange={(e) => setExam(e.target.value)}
                        className="exam-dropdown"
                    >
                        <option value="">Select Exam Type</option>
                        <option value="CA1">CA1</option>
                        <option value="CA2">CA2</option>
                        <option value="CA3">CA3</option>
                        <option value="CA4">CA4</option>
                        <option value="PCA1">PCA1</option>
                        <option value="PCA2">PCA2</option>
                        <option value="Final">Final Exam</option>
                    </select>

                    {subjects.map((subject) => (
                        <div key={subject.subjectCode} className="subject-item">
                            <p className="subject-name">{subject.subjectName}</p>
                            <input
                                type="number"
                                placeholder="Enter marks"
                                className="marks-input"
                                onChange={(e) => handleMarkChange(subject.subjectCode, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit} className="submit-button" disabled={loading}>
                        Save Marks
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllotMarks;
