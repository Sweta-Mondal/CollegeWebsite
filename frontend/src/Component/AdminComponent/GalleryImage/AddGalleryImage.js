import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddGalleryImage = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:5000/addGalleryImage', formData);
            setMessage(response.data.message);
            // Reset the form
            setTitle('');
            setDescription('');
            setImage(null);
            navigate('/gallery-display');
        } catch (error) {
            setMessage('Failed to upload image');
        }
    };

    return (
        <div>
            <h2>Add Gallery Image</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    required 
                />
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Image Title" 
                    required 
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Image Description" 
                    required 
                />
                <button type="submit">Upload Image</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddGalleryImage;
