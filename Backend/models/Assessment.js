const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['Assignment', 'Quiz', 'Project'], required: true },
    course: String,
    deadline: Date,
    maxMarks: Number,
    criteria: String,
  });
  
  module.exports = mongoose.model('Assessment', assessmentSchema);
  