const express = require('express');
const router = express.Router();
const Ebook = require('../../models/Ebook'); 

// Route to fetch eBooks for a logged-in student
router.get('/ebooks', async (req, res) => {
  const { section, semester, department } = req.query;

  try {
    const eBooks = await Ebook.find({
      $or: [
        { section, semester, department },                     
        { section: "", semester, department },              
        { section, semester: "", department },              
        { section, semester, department: "" },  
        { section: "", semester: "", department },
        { section: "", semester, department: ""},      
        { section: "", semester: "", department: "" } 
      ]
    });

    res.status(200).json(eBooks);
  } catch (error) {
    console.error('Error details:', error.message);
    res.status(500).json({ error: 'Failed to fetch eBooks' });
  }
});

module.exports = router;
