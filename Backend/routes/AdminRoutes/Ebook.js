const express = require('express');
const multer = require('multer');
const Ebook = require('../../models/Ebook'); 
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, and PNG are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

// Route to upload eBook
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { ebookTitle, statement, semester, department, section } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Create new eBook document
    const newEbook = new Ebook({
      title: ebookTitle,
      statement: statement,
      filePath: file.filename,
      semester,
      department,
      section
    });

    await newEbook.save();
    res.status(201).send('eBook uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// Route to fetch all eBooks with optional filtering
router.get('/getEbooks', async (req, res) => {
  try {
    const { semester, department, section } = req.query;

    // Create a filter object based on query parameters
    const filter = {};
    if (semester && semester !== 'All') filter.semester = semester; 
    if (department && department !== 'All') filter.department = department;
    if (section && section !== 'All') filter.section = section;

    const ebooks = await Ebook.find(filter);
    res.json(ebooks);
  } catch (error) {
    console.error('Failed to fetch eBooks:', error);
    res.status(500).json({ error: 'Failed to fetch eBooks' });
  }
});




// Route to delete an eBook by ID
router.delete('/deleteEbook/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Ebook.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'eBook not found' });
    }

    res.status(200).json({ message: 'eBook deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete eBook' });
  }
});

module.exports = router;
