import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../../../StyleCSS/EbookList.css';

const EbookList = () => {
    const [ebooks, setEbooks] = useState([]); // Original list of eBooks
    const [filteredEbooks, setFilteredEbooks] = useState([]); // Filtered list of eBooks
    const [filter, setFilter] = useState({
        semester: '',
        department: '',
        section: ''
    });
    const navigate = useNavigate(); 

    useEffect(() => {
        applyFilter();
    }, [filter]); // Reapply filter whenever 'filter' changes
    

    useEffect(() => {
        const fetchEbooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/getEbooks');
                console.log(res.data); // Log fetched data
                setEbooks(res.data);
                setFilteredEbooks(res.data);
            } catch (error) {
                console.error('Failed to fetch ebooks', error);
            }
        };
    
        fetchEbooks();
    }, []);
    
    // Function to apply filtering
    const applyFilter = () => {
        const { semester, department, section } = filter;

        const filtered = ebooks.filter(ebook => {
            return (
                (semester ? ebook.semester === semester : true) &&  // Filter by semester
                (department ? ebook.department === department : true) &&    // Filter by department
                (section ? ebook.section === section : true)                // Filter by section
            );
        });
        setFilteredEbooks(filtered);
    };
    
    // Function to handle filter input changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };
    
    
    // Function to navigate to the Add eBook page
    const handleAddEbook = () => {
        navigate('/add-ebook');
    };

    // Function to delete an eBook
    const handleDeleteEbook = async (id) => {
        alert("Do you want to delete the eBook");
        try {
            await axios.delete(`http://localhost:5000/deleteEbook/${id}`);
            // Update the ebooks state to remove the deleted eBook
            setEbooks(ebooks.filter(ebook => ebook._id !== id));
            setFilteredEbooks(filteredEbooks.filter(ebook => ebook._id !== id));
        } catch (error) {
            console.error('Failed to delete ebook', error);
        }
    };

    return (
        <div className="ebook-container">
            <h2 className="heading">Available eBooks</h2>
            <button onClick={handleAddEbook} className="add-ebook-btn">
                Add eBook
            </button>

            <div className="filter-container">
                <select name="semester" onChange={handleFilterChange}>
                    <option value="">All Semesters</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>

                <select name="department" onChange={handleFilterChange}>
                    <option value="">All Departments</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Chemical Engineering</option>
                </select>

                <select name="section" onChange={handleFilterChange}>
                    <option value="">All Sections</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
            </div>

            <div className="ebook-grid">
                {filteredEbooks.map((ebook) => (
                    <div key={ebook._id} className="ebook-card">
                        <button onClick={() => handleDeleteEbook(ebook._id)} className="delete-btn">
                            🗑️
                        </button>
                        <h3 className="ebook-title">{ebook.title}</h3>
                        <p className="ebook-description">{ebook.statement}</p>
                        <a
                            href={`http://localhost:5000/uploads/${ebook.filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-btn"
                        >
                            Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EbookList;
