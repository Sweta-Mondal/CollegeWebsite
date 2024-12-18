import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../StyleCSS/GalleryDisplay.css';

const GalleryDisplay = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAllImages');
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const handleAddImage = () => {
        navigate('/add-gallery-image');
    };

    const handleDeleteImage = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this image?");
        
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:5000/deleteImage/${id}`);
                setImages((prevImages) => prevImages.filter((img) => img._id !== id));
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };
    

    return (
        <div>
            <h2 className='head'>Gallery</h2>
            <button className='add-gallery-btn' onClick={handleAddImage}>Add Gallery Image</button>
            <div className="gallery">
                {images.map((img) => (
                    <div key={img._id} className="gallery-item">
                        <button className="delete-icon" onClick={() => handleDeleteImage(img._id)}>
                            &#x2716; {/* This represents a delete icon (X) */}
                        </button>
                        <img className='image-gallery' src={`http://localhost:5000/uploads/${img.imageUrl}`} alt={img.title} />
                        <div className="gallery-content">
                            <h3 className='title-image'>{img.title}</h3>
                            <p className='title-desc'>{img.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryDisplay;
