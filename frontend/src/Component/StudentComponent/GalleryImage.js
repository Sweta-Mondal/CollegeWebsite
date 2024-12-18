import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideOptions from './SideOptions';
import Sidebar from './SideBar';

const GalleryImage = () => {
    const [images, setImages] = useState([]);
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

    return (
        <div>
            <SideOptions />
            <Sidebar />
            <h2 className='head'>Gallery</h2>
            <div className="gallery">
                {images.map((img) => (
                    <div key={img._id} className="gallery-item">
                        <img className='image-gallery' src={`http://localhost:5000/uploads/${img.imageUrl}`} alt={img.title} />
                        <div className="gallery-content">
                            <h3 className='title-image'>{img.title}</h3>
                            <p className='title-desc'>{img.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GalleryImage
