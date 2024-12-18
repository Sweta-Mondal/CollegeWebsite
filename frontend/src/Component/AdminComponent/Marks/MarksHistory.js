import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../../StyleCSS/MarksHistory.css';

const MarksHistory = () => {
    const { rollNumber } = useParams();
    const [marksHistory, setMarksHistory] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMarksHistory = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:5000/getMarksHistory', {
                    params: { rollNumber },
                });

                if (response.data && response.data.length > 0) {
                    // Group marks by semester and exam
                    const groupedMarks = response.data.reduce((acc, entry) => {
                        const key = `${entry.semester} - ${entry.exam}`;
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(...entry.marks);
                        return acc;
                    }, {});
                    setMarksHistory(groupedMarks);
                } else {
                    setError('No marks history found for this student.');
                }
            } catch (err) {
                console.error('Error details:', err.response ? err.response.data : err.message);
                setError('Error fetching marks history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMarksHistory();
    }, [rollNumber]);

    return (
        <div className="marks-history-container">
            <h2>Marks History for Roll Number: {rollNumber}</h2>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {Object.keys(marksHistory).length > 0 ? (
                Object.entries(marksHistory).map(([key, marks]) => (
                    <div key={key} className="exam-marks">
                        <h3>Marks for Semester {key}</h3>
                        <table className="marks-history-table">
                            <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.subjectCode}</td>
                                        <td>{entry.subjectName}</td>
                                        <td>{entry.mark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p className="no-data-message">No marks history found for this student.</p>
            )}
        </div>
    );
};

export default MarksHistory;
