const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', 
        required: true
    },
    section: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, { timestamps: true }); 

module.exports = mongoose.model('CourseRegistration', courseRegistrationSchema);
