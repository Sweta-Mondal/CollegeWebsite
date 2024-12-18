const express = require('express');
const router = express.Router();
const Notice = require('../../models/Notice');

//Route to add notice
router.post('/addNotice', async (req, res) => {
  const { title, content, section, semester, department } = req.body;
  const newNotice = new Notice({ title, content, section, semester, department });
  
  try {
    await newNotice.save();
    res.status(200).json(newNotice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add notice' });
  }
});




// Fetch all notices
router.get('/fetchNotices', async (req, res) => {
  const { section, semester, department } = req.query;
  const query = {};

  if (section) query.section = section;
  if (semester) query.semester = semester;
  if (department) query.department = department;

  try {
    const notices = await Notice.find(query);
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});


//Update a notice
router.put('/updateNotice/:id', async (req, res) => {
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);
  const { id } = req.params;
  const { title, content, semester, section, department } = req.body;

  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      {
        title,
        content,
        semester: semester || 'All',
        section: section || 'All',
        department: department || 'All',
      },
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice updated successfully', notice: updatedNotice });
  } catch (error) {
    console.error('Error in updateNotice route:', error);
    res.status(500).json({ error: 'Failed to update notice' });
  }
});


// Delete a specific notice by ID
router.delete('/deleteNotice/:id', async (req, res) => {
  try {
    const noticeId = req.params.id;
    const notice = await Notice.findByIdAndDelete(noticeId);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch a specific notice by ID
router.get('/fetchNotice/:id', async (req, res) => {
  const { id } = req.params;  // Corrected line
  try {
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json(notice); // Send back the notice details
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
