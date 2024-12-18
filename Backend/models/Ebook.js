const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  statement: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  semester: {
    type: String, 
    default: 'All',
  },
  department: {
    type: String, 
    default: 'All',
  },
  section: {
    type: String, 
    default: 'All',
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ebook', ebookSchema);
