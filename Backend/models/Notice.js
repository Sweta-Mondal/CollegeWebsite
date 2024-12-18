const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  semester: {
    type: String,  // Could be String or Number depending on your choice
    default: 'All',
    required: false, // Default for the whole college
  },
  section: {
    type: String,
    default: 'All',
    required: false, // 'All' for the whole college
  },
  department: {
    type: String,
    default: 'All',
    required: false, // 'All' for the whole college
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Notice', noticeSchema);
