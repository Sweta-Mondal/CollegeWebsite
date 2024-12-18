import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SideOptions from './SideOptions';
import Sidebar from './SideBar';
import '../../StyleCSS/StudentEBooks.css';

const Ebooks = () => {
  const location = useLocation();
  const student = location.state;
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ebooks', {
          params: {
            department: student.department,
            section: student.section,
            semester: student.semester,
          },
        });
        setEbooks(response.data);
      } catch (error) {
        console.error('Error fetching eBooks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, [student]);

  if (loading) return <div className="ebooks-loading">Loading eBooks...</div>;

  if (!ebooks.length) return <div className="ebooks-no-data">No eBooks available.</div>;

  return (
    <>
    <SideOptions/>
    <Sidebar />
    <div className="ebooks-container">
      <h2 className="ebooks-heading">Available eBooks</h2>
      <ul className="ebooks-list">
        {ebooks.map((ebook) => (
          <li key={ebook._id} className="ebooks-item">
            <h3 className="ebooks-title">{ebook.title}</h3>
            <p className="ebooks-statement">{ebook.statement}</p>
            <a
              href={`http://localhost:5000/uploads/${ebook.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ebooks-download-btn"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Ebooks;
