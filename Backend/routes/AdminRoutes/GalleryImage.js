const express = require('express');
const multer = require('multer');
const GalleryImage = require('../../models/GalleryImage');
const router = express.Router();
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the destination folder
  },
  filename: (req, file, cb) => {
    // Set the filename to the original name with a timestamp
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to limit accepted file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG and PNG are allowed.'));
  }
};

// Create the upload instance
const upload = multer({ storage, fileFilter });

// Route for adding gallery images
router.post('/addGalleryImage', upload.single('image'), async (req, res) => {
    console.log('Uploaded File:', req.file);
    console.log('Request Body:', req.body);
    try {
        const { title, description } = req.body;
        // Use the new filename with the proper extension
        const imageUrl = req.file.filename; 

        const newImage = new GalleryImage({ title, description, imageUrl });
        await newImage.save();

        res.status(201).json({ message: 'Image added successfully', newImage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add image', error });
    }
});


// Route to fetch images
router.get('/getAllImages', async (req, res) => {
    try {
        const images = await GalleryImage.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch images', error });
    }
});

// Route to delete an image by ID
router.delete('/deleteImage/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the image in the database and delete it
        const deletedImage = await GalleryImage.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Optionally, delete the image file from the server
        const fs = require('fs');
        const path = require('path');

        // Construct the path to the image file
        const imagePath = path.join(__dirname, '../uploads', deletedImage.imageUrl);
        
        // Delete the image file from the server
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });

        return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
