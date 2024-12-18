const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  yearOfStudy: {
    type: String,
    required: true
  },
  semester:{
    type: String,
    required: true
  },
  section:{
    type:String,
    requried: true
  },
  
  department: {
    type: String,
    required: true
  },  
  nameOfGuardian: {
      type: String,
      required: true
  },

  phoneOfGuardian: {
      type: String,
      required: true
    },

    relationWithGuardian: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Student', StudentSchema);


